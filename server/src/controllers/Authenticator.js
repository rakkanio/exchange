import { AuthenticatorModel } from '../models'
// const { requestMessage, verifyMessage , authenticate, logout } = AuthenticatorModel

const requestMessage = async (request, respose) => {
    const { body } = request
    try {
        const data = await AuthenticatorModel.requestMessage(body)
        respose.status(200).send({ message: 'success', data: data })
    } catch (err) {
        respose.status(500).send({ isError: true, message: err.message || err })
    }
}

const verifyMessage = async (request, respose) => {
    const { body } = request
    try {
       const result = await AuthenticatorModel.verifyMessage(body)
        respose.status(200).send({ message: 'success', data: result })
    } catch (err) {
        respose.status(500).send({ isError: true , error: err.message || err })
    }
}

const authenticate = async (request, respose) => {
    try {
        const data = await AuthenticatorModel.authenticate(request)
        respose.status(200).send({ message: 'success', data: data })
    } catch (err) {
        respose.status(500).send({ isError: true, message: err.message || err })
    }
}

const logout = async (request, respose) => {
    try {
        const data = await AuthenticatorModel.logout(respose)
        respose.status(200).send({ message: 'success', data: data })
    } catch (err) {
        respose.status(500).send({ isError: true, message: 'Error while fetching item list' })
    }
}


const AuthenticatorController = {
    requestMessage,
    verifyMessage,
    authenticate,
    logout
}
export default AuthenticatorController