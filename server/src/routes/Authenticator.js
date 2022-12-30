import express from 'express'
import { AuthenticatorController } from '../controllers'


const { requestMessage, verifyMessage, authenticate, logout } = AuthenticatorController


const router = express.Router()

router.post('/request-message', requestMessage)
router.post('/verifry-message', verifyMessage)
router.post('/authenticate', authenticate)
router.get('/logout', logout)


export default router