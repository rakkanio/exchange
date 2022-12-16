import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import mkdirp from 'mkdirp'
import sharp from 'sharp'
import crypto from 'crypto'

import IPFSModel from './IpfsClient'
import IPFS_METADATA from '../constants/IPFS_METADATA'
const { METADATA } = IPFS_METADATA
// import {SERVER_CONFIG} from '../config'
// const {IMG_PATH, SELF_SERVICE}=SERVER_CONFIG

const { uploadFileToIPFS, uploadMetaDataToIPFS } = IPFSModel

const saveDetails = async (attr) => {
    try {
        const { files, title, description, collectionName } = attr
        const id = uuidv4()
        const file = files[0]
        let fileName = `${id}/${file.fileName}`
        const base64 = file.base64.replace(/^data:image\/png;base64,/, '')
        await mkdirp(`assets/${id}`)
        const dirPath = `./assets/${fileName}`
        const data = await fs.writeFile(`assets/${fileName}`, base64, 'base64')
        const fileBuffer = await fs.readFile(`assets/${fileName}`)
        const hash = crypto.createHash('sha256')
        const finalHex = hash.update(fileBuffer).digest('base64')
        // const filePath = path.join(path.resolve(), path.join(`assets`))
        const fileHash = await uploadFileToIPFS({ dirPath })
        // const fileHash = await uploadFileToIPFS({ fileName, filePath: `${filePath}/${fileName}` })
        let metadata = METADATA
        metadata.image = `ipfs://${fileHash}`
        metadata.image_integrity = `sha256-${finalHex}`
        const metaHash = await uploadMetaDataToIPFS({ fileName: 'metadata.json ', filePath: metadata })
        const newItem = {
            id,
            collectionName,
            fileHash,
            fileName,
            description,
            title,
            metaHash,
            metadata,
            createdAt: new Date().toISOString()
        }
        const results = await db.collection('userCollections').insertOne(newItem)

        return { ...data, ...results, ...{ fileHash, metaHash } }
    } catch (err) {
        console.log('Error while creating entry', err)
        throw err
    }
}

const listCollections = async (attr) => {
    try {
        // const {value, name}= attr
        // const query={}
        // if(value){
        //     query['collection']['name']=value
        // }
        // if(value){
        //     query['collection']['value']=value
        // }
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
            results[index]['imgURL'] = `${process.env.SELF_SERVICE}/${results[index].fileName}`
            if (results[index].mergedItem) {
                results[index]['mergedItem']['imgURL'] = `${process.env.SELF_SERVICE}/${results[index]['mergedItem'].fileName}`
            }
            if(results[index].thumbnailFile){
                results[index]['thubnailImgURL'] = `${process.env.SELF_SERVICE}/${results[index].thumbnailFile}`
            }
        }
        return { results }
    } catch (err) {
        throw err
    }

}
const collectionItemDetail = async (attr) => {
    try {
        const { id } = attr
        const result = await db.collection('userCollections').findOne({ 'id': id })
        result['imgURL'] = `${process.env.SELF_SERVICE}/${result.fileName}`

        return { result }
    } catch (err) {
        throw err
    }

}
const mergedListCollectionItems = async (attr) => {
    try {
        const { collection } = attr
        let filteredResult = [];
        let results = await db.collection('userCollections').find({ 'collectionName.value': collection }).toArray()
        results = results.filter((item) => item.mergedItem !== undefined)
            .map(item => {
                if (item.mergedItem.length) {
                    item.mergedItem.id=item.id
                    filteredResult = [...filteredResult, ...item.mergedItem]
                    // filteredResult = filteredResult.concat(item.mergedItem)
                } else {
                    item.mergedItem.id=item.id
                    filteredResult = [...filteredResult, ...[item.mergedItem]]
                    // filteredResult = filteredResult.concat([item.mergedItem])
                }
                //   filteredResult.push(results[index]['mergedItem']['imgURL'] = `${process.env.SELF_SERVICE}/${results[index]['mergedItem'].fileName}`)  
            })
        for (let index = 0; index < filteredResult.length; index++) {
            filteredResult[index]['imgURL'] = `${process.env.SELF_SERVICE}/${filteredResult[index].fileName}`
            filteredResult[index]['id'] = filteredResult[index].id
        }
        return { filteredResult }
    } catch (err) {
        throw err
    }

}

const mergeImagesToUpload = async (attr) => {
    let { id, originalname, position, buffer, description, title } = attr
    try {
        if (position && (typeof position === 'string')) {
            position = JSON.parse(position)
        }
        const { top, left } = position
        const newiItemId = uuidv4()
        const dir = await fs.readdir(`assets/${id}`)
        const fileName = `${newiItemId}/${originalname}`
        await mkdirp(`assets/${newiItemId}`)
        const dirPath = `./assets/${newiItemId}`
        // const data = await fs.writeFile(`assets/${fileName}`, buffer, 'buffer')

        const basefileName = await sharp(buffer).toFile(`assets/${fileName}`)
        
        const randomNumber = Math.floor(Math.random() * 90000) + 10000
        const mergedFileName = `${id}/merged_${randomNumber}.png`
        const thumbnailName = `${id}/thumbnail_${randomNumber}.png`
        
       const thumbnail= await sharp(buffer).resize(130, 130, {}).toFile(`assets/${thumbnailName}`)

        const mergeResponse = await sharp(`assets/${id}/${dir[0]}`)//.resize(1000, 800)
            .composite([{ input: `assets/${newiItemId}/${originalname}`, top: Number(top), left: Number(left) }]).toFile(`assets/${mergedFileName}`)

        const imgURL = `${process.env.SELF_SERVICE}/${mergedFileName}`
        const thumbnailURL = `${process.env.SELF_SERVICE}/${thumbnailName}`

        const itemResult = await db.collection('userCollections').findOne({ id: id })

        const filePath = path.join(path.resolve(), path.join(`assets`))
        // let fileHash = await uploadFileToIPFS({ fileName, filePath: `${filePath}/${fileName}` })
        // let fileCidHash = String(fileHash.cid)

       let fileHash = await uploadFileToIPFS({ dirPath: `./assets/${fileName}` })
        
        let fileBuffer = await fs.readFile(`assets/${fileName}`)
        let hash = crypto.createHash('sha256')
        let finalHex = hash.update(fileBuffer).digest('base64')

        let metadata = METADATA
        metadata.image = `ipfs://${fileHash}`
        metadata.image_integrity = `sha256-${finalHex}`
        let metaHash = await uploadMetaDataToIPFS({ fileName: 'metadata.json ', filePath: metadata })

        const newItemObj = {
            id: newiItemId,
            title: title,
            description: description,
            fileName,
            fileHash,
            metadata,
            metaHash,
            collectionName: itemResult.collectionName,
            createdAt: new Date().toISOString()
        }
        const newItemresults = await db.collection('userCollections').insertOne(newItemObj)

        fileHash = await uploadFileToIPFS({ dirPath: `./assets/${mergedFileName}`})
        fileBuffer = await fs.readFile(`./assets/${mergedFileName}`)
        hash = crypto.createHash('sha256')
        finalHex = hash.update(fileBuffer).digest('base64')
        metadata = METADATA
        metadata.image = `ipfs://${fileHash}`
        metadata.image_integrity = `sha256-${finalHex}`
        metaHash = await uploadMetaDataToIPFS({ fileName: 'metadata.json ', filePath: metadata })

        if (itemResult.mergedItem) {
            itemResult.mergedItem.push({
                fileHash,
                metaHash,
                metadata,
                fileName: mergedFileName
            })
        } else {
            itemResult.mergedItem = [{
                fileHash,
                metaHash,
                metadata,
                fileName: mergedFileName
            }]
        }
        const results = await db.collection('userCollections').updateOne({ id: id }, { $set: { 'mergedItem': itemResult.mergedItem, thumbnailFile:thumbnailName } })
        console.log(imgURL)

        return { mergeResponse, imgURL,thumbnailURL, fileHash, metaHash }
    } catch (err) {
        console.log(err)
        throw { error: err.message || err }
    }
}
const CollectionModel = {
    saveDetails,
    listCollections,
    listCollectionItems,
    mergeImagesToUpload,
    mergedListCollectionItems,
    collectionItemDetail
}

export default CollectionModel