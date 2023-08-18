import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import mkdirp from 'mkdirp'
import sharp from 'sharp'
import crypto from 'crypto'

import IPFSModel from './IpfsClient'
import IPFS_METADATA from '../constants/IPFS_METADATA'
import COLLECTION from '../constants/COLLECTION'

const { METADATA } = IPFS_METADATA
// import {SERVER_CONFIG} from '../config'
// const {IMG_PATH, SELF_SERVICE}=SERVER_CONFIG

const { uploadFileToIPFS, uploadMetaDataToIPFS } = IPFSModel

const saveDetails = async (attr) => {
    try {
        const { files, title, description, collectionName } = attr
        const id = uuidv4()
        const canvasDir = `assets/${id}`
        const file = files[0]
        let fileName = `${file.fileName}`
        let base64=''
        if(file.ext === 'jpeg'){
          base64  = file.base64.replace(/^data:image\/jpeg;base64,/, '')
        }
       else if(file.ext === 'png'){
        base64  = file.base64.replace(/^data:image\/png;base64,/, '')
       }

        await mkdirp(canvasDir)
        await mkdirp(`${canvasDir}/thumbnail`)
        const dirPath = `${canvasDir}/${fileName}`
        const randomNumber = Math.floor(Math.random() * 90000) + 10000
        const thumbnailFile = `${id}/thumbnail/thumbnail_${randomNumber}.${file.ext}`
        const data = await fs.writeFile(`${canvasDir}/${fileName}`, base64, 'base64')
        const fileBuffer = await fs.readFile(`${canvasDir}/${fileName}`)
        const hash = crypto.createHash('sha256')
        const thumbnail= await sharp(fileBuffer).resize(130, 130, {}).toFile(`assets/${thumbnailFile}`) 
        const finalHex = hash.update(fileBuffer).digest('base64')
        // const filePath = path.join(path.resolve(), path.join(`assets`))
         const fileHash = await uploadFileToIPFS({ dirPath })
        // const fileHash = await uploadFileToIPFS({ fileName, filePath: `${filePath}/${fileName}` })
        let metadata = METADATA
        metadata.image = `ipfs://${fileHash}`
        metadata.image_url = `ipfs://${fileHash}`
        // metadata.image_integrity = `sha256-${finalHex}`
        const metaHash = await uploadMetaDataToIPFS({ fileName: 'metadata.json ', filePath: metadata })
        const lastItem = await db.collection('userCollections').find({},{seqNumber:1,_id:-1}).sort({_id:-1}).limit(1).toArray()
        console.log({id,thumbnailFile})
        const newItem = {
            id,
            status: COLLECTION.ITEM.STATUS.ACTIVE,
            type: COLLECTION.ITEM.TYPE.SOURCE,
            seqNumber:Number(lastItem[0].seqNumber) + 1,
            collectionName,
            fileHash,
            fileName: `${id}/${fileName}`,
            description,
            title,
            metaHash,
            metadata,
            thumbnailFile,
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
        let results = await db.collection('userCollections').find({type: COLLECTION.ITEM.TYPE.SOURCE, status: COLLECTION.ITEM.STATUS.ACTIVE }).toArray()
        for (let index = 0; index < results.length; index++) {
            results[index]['imgURL'] = `${process.env.SELF_SERVICE}/${results[index].fileName}`
            if (results[index].mergedItem) {
                results[index]['mergedItem']['imgURL'] = `${process.env.SELF_SERVICE}/${results[index]['mergedItem'].fileName}`
            }
            if(results[index].thumbnailFile){
                results[index]['thubnailImgURL'] = `${process.env.SELF_SERVICE}/${results[index].thumbnailFile}`
            }
        }
        results = results.filter(item=> item.thubnailImgURL)
        return { results }
    } catch (err) {
        throw err
    }

}
const listCollectionItemsByFilter = async (attr) => {
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
        const result = await db.collection('userCollections').findOne({ 'seqNumber': Number(id) })
        result['imgURL'] = `${process.env.SELF_SERVICE}/${result.fileName}`

        return { result }
    } catch (err) {
        console.log('Error while fetching item details', err)
        throw err
    }

}
const mergedListCollectionItems = async (attr) => {
    try {
        const { collection } = attr
        let results = await db.collection('userCollections').find({ type: COLLECTION.ITEM.TYPE.MERGED, status: COLLECTION.ITEM.STATUS.ACTIVE}).toArray()
        // results = results.filter((item) => item.mergedItem !== undefined)
        //     .map(item => {
        //         if (item.mergedItem.length) {
        //             item.mergedItem.id=item.id
        //             filteredResult = [...filteredResult, ...item.mergedItem]
        //             // filteredResult = filteredResult.concat(item.mergedItem)
        //         } else {
        //             item.mergedItem.id=item.id
        //             filteredResult = [...filteredResult, ...[item.mergedItem]]
        //             // filteredResult = filteredResult.concat([item.mergedItem])
        //         }
        //         //   filteredResult.push(results[index]['mergedItem']['imgURL'] = `${process.env.SELF_SERVICE}/${results[index]['mergedItem'].fileName}`)  
        //     })
        for (let index = 0; index < results.length; index++) {
            results[index]['imgURL'] = `${process.env.SELF_SERVICE}/${results[index].fileName}`
        }
        return { results }
    } catch (err) {
        throw err
    }

}
const mergedListCollectionItemsByFilter = async (attr) => {
    try {
        const { collection } = attr
        let filteredResult = [];
        let results = await db.collection('userCollections').find({ 'collectionName.value': collection, type: COLLECTION.ITEM.TYPE.MERGED }).toArray()
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
    let { id, originalname, position, buffer, description, title, mimetype } = attr
    let left=175, top=1850 
    try {
        // if (position && (typeof position === 'string')) {
        //     position = JSON.parse(position)
        //     top = position.top
        //     left = position.left
        // }
        // const { top = 0, left= 0 } = position
        const newiItemId = uuidv4()
        const mergedDirPath = `./assets/${id}`
        const mergedPath = `${id}/${COLLECTION.ITEM.TYPE.MERGED}`
        const canvasDirPath = `assets/${id}`
        const newFileDirPath = `assets/${newiItemId}`
        const fileName = originalname
        const randomNumber = Math.floor(Math.random() * 90000) + 10000
        
        const lastItem = await db.collection('userCollections').find({},{seqNumber:1,_id:-1}).sort({_id:-1}).limit(1).toArray()
        await mkdirp(`${mergedDirPath}/${COLLECTION.ITEM.TYPE.MERGED}`)
        await mkdirp(newFileDirPath)
        
        let dir = await fs.readdir(canvasDirPath)
         dir = dir.filter(file => (String(file).includes('.png') || String(file).includes('.PNG') || String(file).includes('.jpeg')))
        console.log('Last seq number ', Number(lastItem[0].seqNumber))
        
        await sharp(buffer).rotate(360).toFile(`${newFileDirPath}/${fileName}`)
        
        const mergedFileName = `/merged_${randomNumber}.${mimetype.split('/')[1]}`
        const mergeResponse = await sharp(`${canvasDirPath}/${dir[0]}`)//.resize(1000, 800)
            .composite([{ input: `${newFileDirPath}/${fileName}`, top: top, left: left }])
            .toFile(`assets/${mergedPath}${mergedFileName}`)

        const mergedImgURL = `${process.env.SELF_SERVICE}/${mergedPath}${mergedFileName}`

        const itemResult = await db.collection('userCollections').findOne({ id: id })

        // const filePath = path.join(path.resolve(), path.join(`assets`))

    //    let newFileHash = await uploadFileToIPFS({ dirPath: `${newFileDirPath}/${fileName}` })
        
        // let fileBuffer = await fs.readFile(`${newFileDirPath}/${fileName}`)
        // let hash = crypto.createHash('sha256')
        // let finalHex = hash.update(fileBuffer).digest('base64')

        // let metadata = METADATA
        // metadata.image = `ipfs://${newFileHash}`
        // metadata.image_integrity = `sha256-${finalHex}`
        // let metaHash = await uploadMetaDataToIPFS({ fileName: 'metadata.json ', filePath: metadata })

        // const newItemObj = {
        //     id: newiItemId,
        //     title: title,
        //     description: description,
        //     fileName,
        //     newFileHash,
        //     metadata,
        //     metaHash,
        //     collectionName: itemResult.collectionName,
        //     createdAt: new Date().toISOString()
        // }
        // const newItemresults = await db.collection('userCollections').insertOne(newItemObj)

        const mergedFileHash = await uploadFileToIPFS({ dirPath: `${canvasDirPath}/${COLLECTION.ITEM.TYPE.MERGED}/${mergedFileName}`})
        const  mergedFileBuffer = await fs.readFile(`${canvasDirPath}/${COLLECTION.ITEM.TYPE.MERGED}/${mergedFileName}`)
        const  hash = crypto.createHash('sha256')
        const  finalHex = hash.update(mergedFileBuffer).digest('base64')
        let metadata = METADATA
        metadata.image = `ipfs://${mergedFileHash}`
        metadata.image_url = `ipfs://${mergedFileHash}`
        // metadata.image_integrity = `sha256-${finalHex}`
        let metaHash = await uploadMetaDataToIPFS({ fileName: 'metadata.json ', filePath: metadata })
        const mergedId=uuidv4()
        const newMergedItemObject={
            id: mergedId,
            seqNumber:Number(lastItem[0].seqNumber) + 1,
            mergedFileHash,
            metaHash,
            metadata,
            type: COLLECTION.ITEM.TYPE.MERGED,
            status: COLLECTION.ITEM.STATUS.ACTIVE,
            sourceId: id,
            fileName: `${mergedPath}${mergedFileName}`,
            createdAt: new Date().toISOString()
        }
        let newItemObj=  await db.collection('userCollections').insertOne(newMergedItemObject)
        console.log('newItemObj',JSON.stringify(newItemObj))
        if (itemResult.mergedItem) {
            itemResult.mergedItem.push({
                mergedFileHash,
                seqNumber:Number(lastItem[0].seqNumber) + 1,
                id:mergedId,
                sourceId: id,
                metaHash,
                metadata,
                fileName: `${mergedPath}${mergedFileName}`
            })
        } else {
            itemResult.mergedItem = [{
                mergedFileHash,
                seqNumber:Number(lastItem[0].seqNumber) + 1,
                id:mergedId,
                sourceId: id,
                metaHash,
                metadata,
                fileName:  `${mergedPath}${mergedFileName}`
            }]
        }
        const results = await db.collection('userCollections').updateOne({ id: id }, { $set: { 'mergedItem': itemResult.mergedItem } })
        console.log(mergedImgURL)

        return { mergeResponse, mergedImgURL, mergedFileHash, metaHash }
    } catch (err) {
        console.log(err)
        throw { error: err.message || err }
    }
}
const updateCollectionItem = async (attr) => {
    try {
        const { id, payload } = attr
        const result = await db.collection('userCollections').updateOne({id}, {$set: payload})

        return { result:{message:`updated record count ${result.modifiedCount}`} }
    } catch (err) {
        console.log('Error while fetching item details', err)
        throw err
    }

}
const CollectionModel = {
    saveDetails,
    listCollections,
    listCollectionItems,
    mergeImagesToUpload,
    mergedListCollectionItems,
    collectionItemDetail,
    mergedListCollectionItemsByFilter,
    listCollectionItemsByFilter,
    updateCollectionItem
}

export default CollectionModel