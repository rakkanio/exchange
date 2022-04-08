
import { promises as fs } from 'fs'
import { IpfsClient } from '../config';

const uploadFileToIPFS = async (attr) => {
       const { fileName, filePath } = attr
       const fileHash = await _addFile(filePath, fileName)

       console.log('fileHash', fileHash);

}

const _addFile = async (filePath, fileName) => {
       const ipfs = await IpfsClient.ipfsConnection();
       const file = await fs.readFile(filePath);
       const fileAdded = await ipfs.add({ path: fileName, content: file })
       const fileHash = fileAdded[0].hash
       return fileHash
}

const IPFSModel = {
       uploadFileToIPFS
}

export default IPFSModel;