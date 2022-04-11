import express from 'express';
import { ApplicationController } from '../controllers';

const { create, list, itemList } = ApplicationController;


const router = express.Router();

router.post('/create', create);
router.get('/list', list);
router.get('/item/list', itemList);

export default router;