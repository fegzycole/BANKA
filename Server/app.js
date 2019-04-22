import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import YAML from 'yamljs';
import swaggerUiExpress from 'swagger-ui-express';
import Auth from './routes/auth';
import accounts from './routes/accounts';
import transactions from './routes/transactions';
import Authv2 from './routes/authv2';
import accountsv2 from './routes/accountsv2';
import transactionsv2 from './routes/transactionsv2';
import user from './routes/user';


const app = express();

dotenv.config();

const swaggerDoc = YAML.load(`${__dirname}/../swagger.yaml`);

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDoc));

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', Auth);

app.use('/api/v1/accounts', accounts);

app.use('/api/v1/transactions', transactions);

app.use('/api/v2/auth', Authv2);

app.use('/api/v2/accounts', accountsv2);

app.use('/api/v2/transactions', transactionsv2);

app.use('/api/v2/user', user);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome To Banka',
}));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


export default app;
