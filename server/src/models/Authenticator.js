import Moralis from 'moralis'
import jwt  from 'jsonwebtoken'
import MORALIS_CONFIG from '../config/MORALIS_CONFIG'


const requestMessage = async (attr) => {
  try {
  const { address, chain, network } = attr
  const config = {
    domain: MORALIS_CONFIG.APP_DOMAIN,
    statement: 'Please sign this message to confirm your identity.',
    uri: MORALIS_CONFIG.FE_URL,
    timeout: 60,
  }

  const message = await Moralis.default.Auth.requestMessage({
    address,
    chain,
    network,
    ...config,
  })
  return message
} catch (error) {
  console.log('Error while requesting message', error)
  throw error
}
}

const verifyMessage = async (attr) => {
  try {
    const { message, signature } = attr

    const { address, profileId } = (
      await Moralis.default.Auth.verify({
        message,
        signature,
        networkType: 'evm',
      })
    ).raw

    const user = { address, profileId, signature }

    // create JWT token
    const token = jwt.sign(user, MORALIS_CONFIG.AUTH_SECRET)

    // set JWT cookie
    res.cookie('jwt', token, {
      httpOnly: true,
    })

    return token
  } catch (error) {
    console.log('Error while verifying message', error)
    throw error
  }
}

// verify JWT cookie to allow access
const authenticate = async (attr) => {
  const token = attr.cookies.jwt
  // const token = req.cookies.jwt
  if (!token){ 
  throw {message: 'Unauthorized access'}
  } // if the user did not send a jwt token, they are unauthorized
  try {
    const data = jwt.verify(token, MORALIS_CONFIG.AUTH_SECRET)
    return data
  } catch(error) {
    console.log('Error while authenticate user', error)
    throw error
  }
}


// remove JWT cookie
const logout = async (res) => {
  try {
    res.clearCookie('jwt')
    return true
  } catch(error) {
    console.log('Error while logging out', error)
    return false
  }
}

const AuthenticatorModel = {
  requestMessage,
  verifyMessage,
  authenticate,
  logout
}
export default AuthenticatorModel