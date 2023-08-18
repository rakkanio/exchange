'use strict'

import express from 'express'
import ProviderController from '../controllers/Provider.mjs'

import ProviderNetworkMiddleware from '../middlewares/ProviderNetwork.mjs'

const { initNetwork } = ProviderNetworkMiddleware
const { getAccountInfo, signTxn, getParams, sendTxn, doOptin, validate, updateAccount, xummGenerate } = ProviderController

const router = express.Router();

router.get('/info',initNetwork, getAccountInfo)
router.get('/get-params', getParams)
router.post('/sign-transaction', signTxn)
router.post('/send-transaction', sendTxn)
router.post('/opt-in', doOptin)
router.get('/validate', validate)
router.post('/update', updateAccount)
router.post('/xumm/generate/url', xummGenerate)
export default router;