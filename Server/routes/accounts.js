import express from 'express';
import Accountcontroller from '../Controller/accountController';

const { createClientAccount, activateOrDeactivate } = Accountcontroller;

const router = express.Router();

router.post('/', createClientAccount);

router.patch('/:accountNo', activateOrDeactivate);

export default router;
