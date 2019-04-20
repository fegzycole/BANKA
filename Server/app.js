import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Auth from './routes/auth';
import accounts from './routes/accounts';
import transactions from './routes/transactions';
import Authv2 from './routes/authv2';
import accountsv2 from './routes/accountsv2';
import transactionsv2 from './routes/transactionsv2';


const app = express();

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', Auth);
app.use('/api/v1/accounts', accounts);
app.use('/api/v1/transactions', transactions);

app.use('/api/v2/auth', Authv2);
app.use('/api/v2/accounts', accountsv2);
app.use('/api/v2/transactions', transactionsv2);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome To Banka',
}));
// const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log('App listening on port 3000');
});


export default app;
