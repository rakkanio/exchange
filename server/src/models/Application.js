import { promises as fs } from 'fs'
import path from 'path'

import IPFSModel from './IpfsClient'

const { uploadFileToIPFS } = IPFSModel

const saveDetails = async (attr) => {
    try {
        const { files, title, description, collectionName } = attr
        const file = files[0]
        const fileName = file.fileName
        const base64 = file.base64.replace(/^data:image\/png;base64,/, '')
        const data = await fs.writeFile(`assets/${fileName}`, base64, 'base64')
        const filePath = path.join(path.resolve(), path.join('assets'))
        const fileHash = await uploadFileToIPFS({ fileName, filePath: `${filePath}/${fileName}` })
        const results = await db.collection('userCollections').insertOne({ title, fileName, description, collectionName,fileHash:fileHash.cid })
        return { ...data, ...results, ...{ fileHash: fileHash} }
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
        const results = await db.collection('userCollections').find({ collectionName: collection }).toArray()
        return { results }
    } catch (err) {
        throw err
    }

}

const ApplicationModel = {
    saveDetails,
    listCollections,
    listCollectionItems
}

export default ApplicationModel