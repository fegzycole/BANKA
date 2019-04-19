import express from 'express';
import userController from '../Controller/userController';

const router = express.Router();

const { dbCreateAccount, logindB } = userController;

router.post('/signup', dbCreateAccount);

router.post('/signin', logindB);

export default router;
