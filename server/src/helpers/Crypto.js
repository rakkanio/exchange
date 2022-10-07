import { createHash } from 'crypto'


const generateHash= (rawPayload)=>{
    return createHash('sha256').update(JSON.stringify(rawPayload)).digest('base64');
}
const CryptoHelper = {
generateHash
}

export default CryptoHelper