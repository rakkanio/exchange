import { CollectionModel } from '../models'
const { saveDetails, listCollections, listCollectionItems, mergedListCollectionItems,
     collectionItemDetail, mergeImagesToUpload, listCollectionItemsByFilter, 
     mergedListCollectionItemsByFilter, updateCollectionItem } = CollectionModel

const create = async (request, respose) => {
    const { body } = request
    try {
        const data = await saveDetails(body)
        respose.status(200).send({ message: 'success', data: data })
    } catch (err) {
        respose.status(500).send({ isError: true, message: 'Error while saving item details' })
    }
}

const updateEntry = async (request, respose) => {
    const { body, file } = request
    try {
       const result = await mergeImagesToUpload({...body, ...file})
        respose.status(200).send({ message: 'success', data: result })
    } catch (err) {
        respose.status(500).send({ isError: true, message: 'Error while saving item details', error: err.error })
    }
}
const updateItem = async (request, respose) => {
    const { body } = request
    try {
       const result = await updateCollectionItem(body)
        respose.status(200).send({ message: 'success', data: result })
    } catch (err) {
        respose.status(500).send({ isError: true, message: 'Error while updating item details', error: err.error })
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

const itemListByFilter = async (request, respose) => {
    try {
        const { query } = request
        const data = await listCollectionItemsByFilter(query)
        respose.status(200).send({ message: 'success', data: data })
    } catch (err) {
        respose.status(500).send({ isError: true, message: 'Error while fetching item list' })
    }
}
const itemDetail = async (request, respose) => {
    try {
        const { query } = request
        const data = await collectionItemDetail(query)
        respose.status(200).send({ message: 'success', data: data })
    } catch (err) {
        respose.status(500).send({ isError: true, message: 'Error while fetching item list' })
    }
}

const mergedItemList = async (request, respose) => {
    try {
        const { query } = request
        const data = await mergedListCollectionItems(query)
        respose.status(200).send({ message: 'success', data: data })
    } catch (err) {
        respose.status(500).send({ isError: true, message: 'Error while fetching item list' })
    }
}
const mergedItemListByFilter = async (request, respose) => {
    try {
        const { query } = request
        const data = await mergedListCollectionItemsByFilter(query)
        respose.status(200).send({ message: 'success', data: data })
    } catch (err) {
        respose.status(500).send({ isError: true, message: 'Error while fetching item list' })
    }
}


const CollectionController = {
    create,
    list,
    itemList,
    updateEntry,
    mergedItemList,
    itemDetail,
    itemListByFilter,
    mergedItemListByFilter,
    updateItem
}
export default CollectionController