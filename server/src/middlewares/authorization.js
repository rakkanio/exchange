import UserModel from "../models/User"

const { findUser } = UserModel
const check = async (request, response, next) => {
    const { account } = request.body
    const queryObj = {
        query: {
            account
        }
    }
    const user = await findUser(queryObj)
    if (!user?.result?.isAdmin) {
        return response.status(403).send({ error: true, message: 'Unauthorized access' })
    }
    next()
}

const AuthorizationMiddleware = {
    check
}

export default AuthorizationMiddleware