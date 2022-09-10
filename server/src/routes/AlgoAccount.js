'use strict'

import express from 'express'
import AlgoAccountController from '../controllers/AlgoAccount.js'
const { getAccountInfo } = AlgoAccountController

const router = express.Router();

router.get('/account/info', getAccountInfo)
export default router;