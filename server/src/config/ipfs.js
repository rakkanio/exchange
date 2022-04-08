import ipfsClient from 'ipfs-http-client'
const ipfsConnection = async () => {
    try {
        const ipfs = new ipfsClient({host:process.env.IPFS_HOST, port:process.env.IPFS_PORT,
             protocol:process.env.IPFS_PROTOCOL})
        return ipfs
    } catch (e) {
        console.log('Error while connecting with IPFS server', e);
    }
}

const IpfsClient = {
    ipfsConnection
}
export default IpfsClient