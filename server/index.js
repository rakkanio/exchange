import {XummSdk} from 'xumm-sdk'
const Sdk = new XummSdk('fc14310e-f0d0-498e-8e6c-89debec84c23', 'c2469d42-3326-4515-b0a4-6afd2a68a561')



const main = async () => {
  const appInfo = await Sdk.ping()
  console.log(appInfo.application.name)

  const request = {
    "txjson": {
      "TransactionType": "Payment",
      "Destination": "rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ",
      "Amount": "10000"
    },
    // "user_token": "4909ef15-0348-4faa-b7df-2120defc15a3"
  }

  const subscription = await Sdk.payload.createAndSubscribe(request, event => {
    console.log('New payload event:', event.data)

    // The event data contains a property 'signed' (true or false), return :)
    if (Object.keys(event.data).indexOf('signed') > -1) {
      return event.data
    }
  })

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
}

main()

  