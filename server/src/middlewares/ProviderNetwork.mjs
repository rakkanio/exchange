'use strict'
import PROVIDER from '../constants/PROVIDER.mjs'
import ProviderModule from '../models/Provider.mjs'

const { initialize } = ProviderModule

const initNetwork = async (request, response, next) => {
    const { network } = { ...request.body, ...request.query }
    if (network === PROVIDER.NETWORK_TYPE.TESTNET) {
        await initialize('wss://testnet.xrpl-labs.com/')
    } else {
        await initialize('wss://xrplcluster.com/')
    }
    next()
}

const ProviderNetworkMiddleware = {
    initNetwork
}

export default ProviderNetworkMiddleware

