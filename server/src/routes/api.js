import express from 'express';
import {ApplicationController} from '../controllers';

const {create} = ApplicationController;


const router = express.Router();
//TODO
router.post('/create',create);

export default router;