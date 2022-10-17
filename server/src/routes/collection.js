import express from 'express'
import  multer  from  'multer'
import { CollectionController } from '../controllers'
import AuthorizationMiddleware from '../middlewares/authorization'

const {check} = AuthorizationMiddleware
const upload = multer()

const { create, list, itemList,updateEntry, mergedItemList } = CollectionController


const router = express.Router()

router.post('/create',check, create)
router.post('/update-entry', upload.single('file'), updateEntry)
router.get('/list', list)
router.get('/item/list', itemList)
router.get('/merged/item/list', mergedItemList)

export default router