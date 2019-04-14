/* eslint-disable linebreak-style */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Auth from './routes/auth';
import accounts from './routes/accounts';
import transactions from './routes/transactions';


const app = express();

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', Auth);
app.use('/api/v1/accounts', accounts);
app.use('/api/v1/transactions', transactions);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome To Banka',
}));
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export default app;
