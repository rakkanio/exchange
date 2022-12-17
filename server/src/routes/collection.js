import express from 'express'
import  multer  from  'multer'
import { CollectionController } from '../controllers'
import AuthorizationMiddleware from '../middlewares/authorization'

const {check} = AuthorizationMiddleware
const upload = multer()

const { create, list, itemList,updateEntry, mergedItemList, itemDetail, itemListByFilter, mergedItemListByFilter } = CollectionController


const router = express.Router()

router.post('/create',check, create)
router.post('/update-entry', upload.single('file'), updateEntry)
router.get('/list', list)
router.get('/item/list', itemList)
router.get('/item/list/filter', itemListByFilter)
router.get('/item/details', itemDetail)
router.get('/merged/item/list', mergedItemList)
router.get('/merged/item/list/filter', mergedItemListByFilter)

export default router