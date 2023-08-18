'use strict'
import Moralis  from 'moralis'

const {
    MORALIS_API_KEY='',
    APP_DOMAIN='',
    FE_URL='',
    AUTH_SECRET=''

} = process.env

const MORALIS_CONFIG = {
    MORALIS_API_KEY,
    APP_DOMAIN,
    FE_URL,
    AUTH_SECRET

}
async function start(){
    await Moralis.default.start({
        apiKey: MORALIS_API_KEY,
      })
}
start()

export default MORALIS_CONFIG