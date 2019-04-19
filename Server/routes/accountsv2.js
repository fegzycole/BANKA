import express from 'express';
import Accountcontroller from '../Controller/accountController';


const { createClientAccountDb } = Accountcontroller;


const router = express.Router();

router.post('/', createClientAccountDb);

export default router;
