import {MongoClient } from 'mongodb';
const connection = async () => {
    try {
        const client = await new MongoClient(process.env.MONGODB_URL).connect();
        global.db = client.db(process.env.MONGODB_NAME)
    } catch (e) {
        console.log('mongo connection error', e);
    }
}

const MongoConfig = {
    connection
}
export default MongoConfig