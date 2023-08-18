'use strict'

import {XummSdk} from 'xumm-sdk'
import { XUMM_CONFIG } from '../config'
const Sdk = new XummSdk(XUMM_CONFIG.XUMM_APP_KEY, XUMM_CONFIG.XUMM_SECRET_KEY)

const generateUrl = (attr) => {
  return new Promise(async(resolve, reject)=>{
  const { amount, destination='' } = attr
  try {
        const appInfo = await Sdk.ping()
        console.log('appInfo.application.name',appInfo.application.name)
      
        const request = {
          "txjson": {
            "TransactionType": "Payment",
            "Destination": destination || XUMM_CONFIG.XUMM_WALLET_ADDRESS,
            "Amount": String(amount)
          }
        }
      
        const subscription = await Sdk.payload.createAndSubscribe(request, event => {
        //   console.log('New payload event:', event.data)
      
          // The event data contains a property 'signed' (true or false), return :)
          if (Object.keys(event.data).indexOf('signed') > -1) {
            return event.data
          }
        })
        resolve({url: subscription.created.next.always})
        console.log('New payload created, URL:', subscription.created.next.always)
        console.log('  > Pushed:', subscription.created.pushed ? 'yes' : 'no')
      
        const resolveData = await subscription.resolved
      
        if (resolveData.signed === false) {
          console.log('The sign request was rejected :(')
        } else {
          console.log('Woohoo! The sign request was signed :)')
          /**
           * Let's fetch the full payload end result and check for
           * a transaction hash, to verify the transaction on ledger later.
           */
          const result = await Sdk.payload.get(resolveData.payload_uuidv4)
          console.log('On ledger TX hash:', result.response.txid)
        } 
  } catch (err) {
    console.log('Error while generating xumm url', err)
    reject(err)
  }
})
}




const XummModel = {
  generateUrl
}

export default XummModel

