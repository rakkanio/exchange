import { create } from 'ipfs-http-client'

const ipfsConnection = async () => {
    try {
        console.log('Connect to client')
        const ipfs =  create()
        return ipfs
    } catch (e) {
        console.log('Error while connecting with IPFS server', e);
    }
}

const IpfsClient = {
    ipfsConnection
}
export default IpfsClient