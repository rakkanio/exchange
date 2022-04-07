import { promises as fs } from 'fs';

const saveDetails = async (attr) => {
    try {
        const { files, title, description, collectionName } = attr;
        const file = files[0];
        const base64 = file.base64.replace(/^data:image\/png;base64,/, '');
        const fileName = `${new Date().getTime()}.${file.ext}`;
        const data = await fs.writeFile(`assets/${fileName}`, base64, 'base64');
        const results = await db.collection('userCollections').insertOne({ title, fileName, description, collectionName })
        return { ...data, ...results };
    } catch (err) {
        console.log('Error while creating entry',err);
        throw err;
    }
}

const ApplicationModel = {
    saveDetails
}

export default ApplicationModel;