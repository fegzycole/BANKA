import express from 'express';
import userController from '../Controller/userController';

const router = express.Router();

const { getUserAccounts } = userController;

router.get('/:email/accounts', getUserAccounts);

export default router;
