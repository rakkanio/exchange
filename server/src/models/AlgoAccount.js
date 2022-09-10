'use strict'

import axios from 'axios'

const fetchAccount = async (attr) => {
    let account;
    try {
        const options = {
            method: 'GET',
            headers: { 'X-API-key': process.env.ALGO_API_KEY },
            url: `${process.env.ALGO_ACCOUNT_INFO_URL}/${attr.account}`,
        }

        account = await axios(options)
        if (account.data.assets.length === 0) {
            return { error: true, message: `You don't have enough algo, please add it.` }
        } else {
            const asset = account.data.assets.find((item) => item['asset-id'] === Number(process.env.ALGO_USDC_ASSET_ID))
            if (!asset) {
                return { error: true, message: `You don't have enough USDC, please add.` }
            } else {
                return { amount: String(Number(asset.amount / 1000000).toFixed(2)) }
            }
        }
    } catch (err) {
        console.log('Error while fetching account info', err)
        throw new Error(err.message || err)
    }
}

const AlgoAccountModel = {
    fetchAccount
}

export default AlgoAccountModel

