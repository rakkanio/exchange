'use strict'

import AlgoAccountModel from "../models/AlgoAccount.js"

const { fetchAccount } = AlgoAccountModel
const getAccountInfo = async (request, response) => {
    const { query } = request
    try {
        const data = await fetchAccount({ account: query.account })
        response.status(200).send({ message: 'success', data: data })
    } catch (err) {
        response.status(500).send({ isError: true, message: err.message })
    }
}

const AlgoAccountController = {
    getAccountInfo
}
export default AlgoAccountController