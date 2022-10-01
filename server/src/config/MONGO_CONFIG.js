import { MongoClient, ObjectId } from 'mongodb';
import SERVER_CONFIG from './SERVER_CONFIG.mjs';
const connection = async () => {
    try {
        const client = await new MongoClient(SERVER_CONFIG.MONGODB_URL).connect();
        global.db = client.db(SERVER_CONFIG.MONGODB_NAME)
        global.ObjectId = ObjectId
        console.log('Mongo collection stablished')
    } catch (e) {
        console.log('Mongo connection error', e)
        throw new Error('Mongo connection err')
    }
}

const MongoConfig = {
    connection
}
export default MongoConfig