/* eslint-disable linebreak-style */
import express from 'express';
import bodyParser from 'body-parser';
import Auth from './routes/auth';
import accounts from './routes/accounts';
import transactions from './routes/transactions';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', Auth);
app.use('/api/v1/accounts', accounts);
app.use('/api/v1/transactions', transactions);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome To Banka',
}));
const SECRET = 'superSecret';
process.env.SECRET = SECRET;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


export default app;
