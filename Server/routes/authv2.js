import express from 'express';
import userController from '../Controller/userController';

const router = express.Router();

const { dbCreateAccount } = userController;

router.post('/signup', dbCreateAccount);

export default router;
