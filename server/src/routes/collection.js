import express from 'express';
import  multer  from  'multer'
import { CollectionController } from '../controllers';
const upload = multer()

const { create, list, itemList,updateEntry } = CollectionController;


const router = express.Router();

router.post('/create', create);
router.post('/update-entry', upload.single('file'), updateEntry);
router.get('/list', list);
router.get('/item/list', itemList);

export default router;