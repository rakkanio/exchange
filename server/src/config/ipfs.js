import { create } from 'ipfs-http-client'

const ipfsConnection = async () => {
    try {
        console.log(`Connect to client ${process.env.IPFS_HOST}:${process.env.IPFS_PORT}`)
        global.ipfs = create(`${process.env.IPFS_HOST}:${process.env.IPFS_PORT}`)
    } catch (err) {
        console.log('Error while connecting with IPFS server', e)
        throw err
    }
}

const IpfsClient = {
    ipfsConnection
}
export default IpfsClient