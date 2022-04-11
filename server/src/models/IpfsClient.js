
import { promises as fs } from 'fs'

const uploadFileToIPFS = async (attr) => {
       try {
              const { fileName, filePath } = attr
              const fileHash = await _addFile(filePath, fileName)
              console.log('fileHash', fileHash)
              return fileHash
       } catch (err) {
              console.log('Error while uploading file to IPFS server', err)
              throw err
       }

}

const _addFile = async (filePath, fileName) => {
       try {
              // return {path: "34.png",cid: "CID(QmUY77UDEqiD2tVWqzCXm7x6pQLgYJbh1AUw72XXcsfqDP)",size: 893849}
              const file = await fs.readFile(filePath)
              const fileAdded = await ipfs.add({ path: fileName, content: file })
              const fileHash = fileAdded
              return fileHash
       } catch (err) {
              throw err
       }
}

const IPFSModel = {
       uploadFileToIPFS
}

export default IPFSModel