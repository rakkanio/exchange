import { create } from 'ipfs-http-client'

const ipfsConnection = async () => {
    try {
        console.log(`Connect to client ${process.env.IPFS_HOST}:${process.env.IPFS_PORT}`)
        const ipfs =  create(`${process.env.IPFS_HOST}:${process.env.IPFS_PORT}`)
        return ipfs
    } catch (e) {
        console.log('Error while connecting with IPFS server', e);
    }
}

const IpfsClient = {
    ipfsConnection
}
export default IpfsClient