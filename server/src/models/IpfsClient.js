
import { promises as fs } from 'fs'

const uploadFileToIPFS = async (attr) => {
       try {
              const { fileName, filePath } = attr
              const fileHash = await _addFile(filePath, fileName)
              return fileHash
       } catch (err) {
              console.log('Error while uploading file to IPFS server', err)
              throw err
       }

}
const uploadMetaDataToIPFS = async (attr) => {
       try {
              const { fileName, filePath } = attr
              const fileHash = await _addMetaDataFile(JSON.stringify(filePath), fileName)
              return fileHash
       } catch (err) {
              console.log('Error while uploading metadata file to IPFS server', err)
              throw err
       }

}

const _addFile = async (filePath, fileName) => {
       try {
              // return {path: "34.png",cid: "CID(QmUY77UDEqiD2tVWqzCXm7x6pQLgYJbh1AUw72XXcsfqDP)",size: 893849}
              const file = await fs.readFile(filePath)
              const fileAdded = await ipfs.add({ path: fileName, content: file })
              return fileAdded
       } catch (err) {
              throw err
       }
}
const _addMetaDataFile = async (filePath, fileName) => {
       try {
              // return {path: "34.png",cid: "CID(QmUY77UDEqiD2tVWqzCXm7x6pQLgYJbh1AUw72XXcsfqDP)",size: 893849}
              const fileAdded = await ipfs.add({ path: fileName, content: filePath })
              return fileAdded
       } catch (err) {
              throw err
       }
}

const IPFSModel = {
       uploadFileToIPFS,
       uploadMetaDataToIPFS
}

export default IPFSModel