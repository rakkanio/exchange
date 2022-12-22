import { create, CID } from 'ipfs-http-client'

const ipfsConnection = async () => {
    try {
        global.ipfs = create(`${process.env.IPFS_HOST}:${process.env.IPFS_PORT}`)
        console.log(`Connected to client ${process.env.IPFS_HOST}:${process.env.IPFS_PORT}`)
        global.CID=CID
    } catch (err) {
        console.log('Error while connecting with IPFS server', e)
        throw err
    }
}

const IpfsClient = {
    ipfsConnection
}
export default IpfsClient