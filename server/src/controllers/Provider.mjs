'use strict'

import AlgoAccountModel from "../models/Provider.mjs"
import XummModel from "../models/Xumm.mjs"

const { generateUrl } = XummModel
const { fetchAccount, signTransaction, sendTransaction, optIn, validateAccount, updateUserAccout } = AlgoAccountModel

const getAccountInfo = async (request, response) => {
    const { query } = request
    const { account, network } = query
    try {
        const data = await fetchAccount({ account, network })
        response.status(200).send({ message: 'success', data: data })
    } catch (err) {
        response.status(500).send({ isError: true, message: err.message })
    }
}

const getParams = async (request, response) => {
    const { account, network } = request.query
    try {
        const { query } = request
        const data = await fetchAccount({ account, network })
        response.status(200).send({ message: 'success', data: data })
    } catch (err) {
        response.status(500).send({ isError: true, message: 'Error while fetching account details' })
    }
}

const signTxn = async (request, response) => {
    try {
        const { body } = request
        const data = await signTransaction(body)
        response.status(200).send({ message: 'success', data: data })
    } catch (err) {
        response.status(500).send({ isError: true, message: 'Error while signing transaction' })
    }
}
const sendTxn = async (request, response) => {
    try {
        const { body } = request
        const data = await sendTransaction(body)
        response.status(200).send({ message: 'success', data: data })
    } catch (err) {
        response.status(500).send({ isError: true, message: 'Error while signing transaction' })
    }
}

const doOptin = async (request, response) => {
    try {
        const { query } = request
        const data = await optIn(query)
        response.status(200).send({ message: 'success', data: data })
    } catch (err) {
        response.status(500).send({ isError: true, message: 'Error while doing opt in' })
    }
}

const validate = async (request, response) => {
    try {
        const { query } = request
        const data = await validateAccount(query)
        response.status(200).send({ message: 'success', data: data })
    } catch (err) {
        response.status(500).send({ isError: true, message: 'Error while validating account' })
    }
}

const updateAccount = async (request, response) => {
    try {
        const { query, body } = request
        const data = await updateUserAccout({ query, body })
        response.status(200).send({ message: 'success', data: data })
    } catch (err) {
        response.status(500).send({ isError: true, message: 'Error while updatingaccount info' })
    }
}

const xummGenerate = async (request, response) => {
    try {
        const { body } = request
        const data = await generateUrl(body)
        response.status(200).send({ message: 'success', data: data })
    } catch (err) {
        response.status(500).send({ isError: true, message: 'Error while generating xumm url', error: err })
    }
}


const ProviderController = {
    getAccountInfo,
    signTxn,
    getParams,
    sendTxn,
    doOptin,
    validate,
    updateAccount,
    xummGenerate
}
export default ProviderController