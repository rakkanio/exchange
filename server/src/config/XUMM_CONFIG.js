'use strict'
import dotenv from 'dotenv'
import path from 'path'

const __dirname = path.resolve()
dotenv.config({ path: path.join(__dirname, 'src', '.env') })

const {
    XUMM_APP_KEY,
    XUMM_SECRET_KEY,
    XUMM_WALLET_ADDRESS
} = process.env

const XUMM_CONFIG = {
    XUMM_APP_KEY,
    XUMM_SECRET_KEY,
    XUMM_WALLET_ADDRESS
}

export default XUMM_CONFIG