import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import mkdirp from 'mkdirp'
import sharp from 'sharp'

import IPFSModel from './IpfsClient'
// import {SERVER_CONFIG} from '../config'
// const {IMG_PATH, SELF_SERVICE}=SERVER_CONFIG

const { uploadFileToIPFS } = IPFSModel

const saveDetails = async (attr) => {
    try {
        const { files, title, description, collectionName } = attr
        const items = []
        const id = uuidv4()
        const file = files[0]
        let fileName = `${id}/${file.fileName}`
        const base64 = file.base64.replace(/^data:image\/png;base64,/, '')
        await mkdirp(`assets/${id}`)
        const data = await fs.writeFile(`assets/${fileName}`, base64, 'base64')
        const filePath = path.join(path.resolve(), path.join(`assets`))
        const fileHash = await uploadFileToIPFS({ fileName, filePath: `${filePath}/${fileName}` })
        items.push({
            fileHash,
            fileName,
            description,
            title
        })
        const results = await db.collection('userCollections').insertOne({ id, collectionName, items })

        return { ...data, ...results, ...{ fileHash: fileHash } }
    } catch (err) {
        console.log('Error while creating entry', err)
        throw err
    }
}

const listCollections = async () => {
    try {
        const results = await db.collection('collections').find().toArray()
        return { results }
    } catch (err) {
        throw err
    }

}

const listCollectionItems = async (attr) => {
    try {
        const { collection } = attr
        const results = await db.collection('userCollections').find({ 'collectionName.value': collection }).toArray()
        for (let index = 0; index < results.length; index++) {
            for (let i = 0; i < results[index].items.length; i++) {
                results[index].items[i]['imgURL']=`${process.env.SELF_SERVICE}/static/${results[index].items[i].fileName}`
            }   
        }
        return { results }
    } catch (err) {
        throw err
    }

}

const mergeImagesToUpload = async (attr) => {
    try {
        const dir = await fs.readdir(`assets/${attr.id}`)
        const data = await fs.writeFile(`assets/${attr.id}/${attr.originalname}`, attr.buffer, 'buffer')
        const randomNumber=Math.floor(Math.random()*90000) + 10000
        const fileName=`${attr.id}/merged_${randomNumber}.png`;
        const mergeResponse = await sharp(`assets/${attr.id}/${attr.originalname}`)//.resize(1000, 800)
        .composite([{ input: `assets/${attr.id}/${dir[0]}` }]).toFile(`assets/${fileName}`)
        const imgURL=`${process.env.SELF_SERVICE}/static/${fileName}`
        const filePath = path.join(path.resolve(), path.join(`assets`))
        const fileHash = await uploadFileToIPFS({ fileName, filePath: `${filePath}/${fileName}`})
        const item={
            fileHash,
            title: attr.title,
            fileName,
            description: attr.desc
        }
        const itemResult = await db.collection('userCollections').findOne({ id:attr.id})
        const {items}= itemResult
        items.push(item)

        const results = await db.collection('userCollections').updateOne({ id:attr.id},{$set:{'items': items}})
        console.log(imgURL, fileHash)

        return {mergeResponse,imgURL, fileHash}
    } catch (err) {
        console.log(err)
        throw {err: err}
    }
}
const CollectionModel = {
    saveDetails,
    listCollections,
    listCollectionItems,
    mergeImagesToUpload
}

export default CollectionModel