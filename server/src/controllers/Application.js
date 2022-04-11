import { ApplicationModel } from './../models'
const { saveDetails, listCollections, listCollectionItems } = ApplicationModel

const create = async (request, respose) => {
    const { body } = request
    try {
        const data = await saveDetails(body)
        respose.status(200).send({ message: 'success', data: data })
    } catch (err) {
        respose.status(500).send({ isError: true, message: 'Error while saving item details' })
    }
}

const list = async (request, respose) => {
    try {
        const data = await listCollections()
        respose.status(200).send({ message: 'success', data: data })
    } catch (err) {
        respose.status(500).send({ isError: true, message: 'Error while fetching collection list' })
    }
}

const itemList = async (request, respose) => {
    try {
        const { query } = request
        const data = await listCollectionItems(query)
        respose.status(200).send({ message: 'success', data: data })
    } catch (err) {
        respose.status(500).send({ isError: true, message: 'Error while fetching item list' })
    }
}

const ApplicationController = {
    create,
    list,
    itemList
}
export default ApplicationController