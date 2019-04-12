import express from 'express';
import Accountcontroller from '../Controller/accountController';

const { createClientAccount } = Accountcontroller;

const router = express.Router();

router.use('/', createClientAccount);

export default router;
