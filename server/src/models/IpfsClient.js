
import { promises as fs } from 'fs'
import { create, globSource } from 'ipfs'

const uploadFileToIPFS = async (attr) => {
       try {
              const { dirPath, fileName } = attr
              const fileHash = await _addFile(dirPath,fileName)
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
              const hashArr=[]
              // // return {path: "34.png",cid: "CID(QmUY77UDEqiD2tVWqzCXm7x6pQLgYJbh1AUw72XXcsfqDP)",size: 893849}
              // const file = await fs.readFile(filePath)
              // const fileAdded = await ipfs.add({ path: fileName, content: file, wrapWithDirectory:false})
              // const {cid}= fileAdded
              // const fileHash = cid.toString()
              // console.log(`uploaded file hash-> ${fileHash}`)
              // return fileHash
              for await (const file of ipfs.addAll(globSource(filePath, '**/*'))) {
                     let fileHash= String(file.cid)
                     console.log({
                            filePath: filePath,
                            fileHash: fileHash
                     })
                     hashArr.push(fileHash)
                   }
                   return hashArr[0]

       } catch (err) {
              throw err
       }
}
const _addMetaDataFile = async (filePath, fileName) => {
       try {
              // return {path: "34.png",cid: "CID(QmUY77UDEqiD2tVWqzCXm7x6pQLgYJbh1AUw72XXcsfqDP)",size: 893849}
              const fileAdded = await ipfs.add({ path: fileName, content: filePath, mode:Number(644) })
              const {cid}= fileAdded
              const fileHash = cid.toString()
              console.log(`uploaded metadata file hash-> ${fileHash}`)
              return fileHash
       } catch (err) {
              throw err
       }
}

const IPFSModel = {
       uploadFileToIPFS,
       uploadMetaDataToIPFS
}

export default IPFSModel