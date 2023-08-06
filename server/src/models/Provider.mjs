'use strict'

import xrpl from 'xrpl'

const initialize = async (server) => {
  global.algoClient = new xrpl.Client(server)
  await algoClient.connect()
}

const fetchAccount = async (attr) => {
  const { account } = attr
  try {
    const xrpResponse = await algoClient.request({
      "command": "account_info",//
      "account": account,
      "ledger_index": "validated"
    })
    const usdResponse = await algoClient.request({
      "command": "account_lines",//
      "account": account,
      "ledger_index": "validated"
    })
    let usdAmountObj = usdResponse.result.lines.find(item => item.currency === 'USD')
    console.log(JSON.stringify(usdAmountObj))
    return { xrpResponse, usdAmountObj }

  } catch (err) {
    console.log('Error while fetching account info', err)
    throw new Error(err)
  }
}




const ProviderModel = {
  initialize,
  fetchAccount
}

export default ProviderModel

