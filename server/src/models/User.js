const findUser = async (attr) => {
    try {
        const {query}= attr
        const result = await db.collection('users').findOne(query)
        return { result }
    } catch (err) {
        throw err
    }

}

const UserModel = {
    findUser
}

export default UserModel