import express from 'express';

import Accountcontroller from '../Controller/accountController';

import helper from '../helper/helper';

const { verifyTokenAccounts } = helper;

const { createClientAccountDb, activateOrDeactivateDb, deleteAnAccountDb } = Accountcontroller;


const router = express.Router();

router.post('/', createClientAccountDb);

router.patch('/:accountNo', verifyTokenAccounts, activateOrDeactivateDb);

router.delete('/:accountNo', verifyTokenAccounts, deleteAnAccountDb);

export default router;
