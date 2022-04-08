import { promises as fs } from 'fs';
import IPFSModel from './IpfsClient';

const { uploadFileToIPFS } = IPFSModel

const saveDetails = async (attr) => {
    try {
        const { files, title, description, collectionName, fileName } = attr;
        const file = files[0];
        const base64 = file.base64.replace(/^data:image\/png;base64,/, '');
        const data = await fs.writeFile(`assets/${fileName}`, base64, 'base64');
        const fileHash = uploadFileToIPFS({ fileName, filePath: `assets/` })
        const results = await db.collection('userCollections').insertOne({ title, fileName, description, collectionName })
        return { ...data, ...results, ...{ fileHash: fileHash } };
    } catch (err) {
        console.log('Error while creating entry', err);
        throw err;
    }
}

const ApplicationModel = {
    saveDetails
}

export default ApplicationModel;