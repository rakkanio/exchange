'use strict'
import dotenv from 'dotenv'
import path from 'path'
const __dirname = path.resolve()
dotenv.config({ path: path.join(__dirname, 'src', '.env') })

const {
    PORT,
    BODY_LIMIT,
    MONGODB_URL,
    MONGODB_NAME,
    ALGO_ACCOUNT_INFO_URL,
    ALGO_API_KEY,
    ALGO_USDC_ASSET_ID,
    ALGO_BASE_SERVER,
    ALGO_WALLET_MNEMONIC,
    ALGO_WALLET_ADDRESS,
    ALGO_AMOUNT,
    LNPAY_WALLET_URL,
    LNPAY_API_KEY,
    LNPAY_WALLET_ADDRESS,
    LNPAY_DECODE_API,
    UPHOLD_API_URL,
    UPHOLD_USDC_PAIR

} = process.env

const SERVER_CONFIG = {
    PORT,
    BODY_LIMIT,
    MONGODB_URL,
    MONGODB_NAME,
    ALGO_ACCOUNT_INFO_URL,
    ALGO_API_KEY,
    ALGO_USDC_ASSET_ID: Number(ALGO_USDC_ASSET_ID),
    ALGO_WALLET_MNEMONIC,
    ALGO_BASE_SERVER,
    ALGO_AMOUNT,
    LNPAY_WALLET_URL,
    LNPAY_API_KEY,
    LNPAY_WALLET_ADDRESS,
    LNPAY_DECODE_API,
    UPHOLD_API_URL,
    UPHOLD_USDC_PAIR,
    ALGO_WALLET_ADDRESS

}

export default SERVER_CONFIG