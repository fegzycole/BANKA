/* eslint-disable linebreak-style */
import express from 'express';
import Accountcontroller from '../Controller/accountController';

const { createClientAccount, activateOrDeactivate, deleteAnAccount } = Accountcontroller;

const router = express.Router();

router.post('/', createClientAccount);

router.patch('/:accountNo', activateOrDeactivate);

router.delete('/:accountNo', deleteAnAccount);

export default router;
