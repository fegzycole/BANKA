// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import helper from '../helper/helper';

dotenv.config();

// const { accounts } = testData;

// const { validateCreateAccount, validateStatusInput } = Validator;

// const { createAccountNumber, createAccountNumberDb } = helper;

// class AccountController {
//   /**
//    * create a new Bank Account V1
//    * @param {*} req
//    * @param {*} res
//    */
//   static createClientAccount(req, res) {
//     try {
//     // Decode the client's token
//       const token = req.body.token || req.headers['x-access-token'];
//       if (token) {
//         jwt.verify(token, process.env.SECRET, (err, decoded) => {
//           if (err) {
//           // return an error if it fails to decode
//             return res.status(404).json({
//               status: 404,
//               message: err,
//             });
//           }
//           req.decoded = decoded;
//         });
//       }
//       const openingBal = parseFloat(0.00);

//       const accountNumber = createAccountNumber();

//       const accountNo = accountNumber;

//       const account = {
//         accountNo,
//         firstName: req.decoded.user.firstName,
//         lastName: req.decoded.user.lastName,
//         email: req.decoded.user.email,
//         owner: req.decoded.user.id,
//         type: req.body.type,
//         status: 'draft',
//         openingBal,
//       };

//       const { error } = validateCreateAccount(req.body);
//       if (error) {
//         return res.status(400).json({
//           status: 400,
//           message: error.message,
//         });
//       }
//       // pushes the new account to the DB if it validates
//       accounts.push(account);
//       return res.json({
//         status: 200,
//         data: account,
//       });
//     } catch (e) {
//       return res.status(500).json({
//         status: 500,
//         error: 'Sorry, something went wrong, try again',
//       });
//     }
//   }

//   /**
//    * create a new Bank Account V2
//    * @param {*} req
//    * @param {*} res
//    */
//   static async createBankAccount(req, res) {
//     try {
//       const userDetails = req.decoded.user;
//       const openingBal = parseFloat(0.00);
//       const accountNumber = await createAccountNumberDb();
//       const account = [accountNumber, userDetails.id, req.body.type, 'draft', openingBal];
//       // pushes the new account to the DB if it validates
//       const queryString = 'INSERT INTO accountstable(accountnumber, owner, type, status, balance, createdon) VALUES($1, $2, $3, $4, $5, NOW()) returning *';
//       const { rows } = await Db.query(queryString, account);
//       await Db.query('COMMIT');
//       const openingBalance = Number(rows[0].balance).toFixed(2);
//       return res.json({
//         status: 200,
//         data: {
//           accountNumber: parseInt(rows[0].accountnumber, 10),
//           firstName: userDetails.firstname,
//           lastName: userDetails.lastname,
//           email: userDetails.email,
//           type: rows[0].type,
//           openingBalance: parseFloat(openingBalance),
//         },
//       });
//     } catch (e) {
//       return res.status(500).json({
//         status: 500,
//         error: 'Sorry, something went wrong, try again',
//       });
//     }
//   }

//   /**
//    * Toggle Account Status V1
//    * @param {*} req
//    * @param {*} res
//    */
//   static activateOrDeactivate(req, res) {
//     try {
//       const account = accounts.find(c => c.accountNo === parseInt(req.params.accountNo, 10));
//       if (!account) {
//         return res.status(404).json({
//           status: 404,
//           error: 'Account not found',
//           message: 'Account not found',
//         });
//       }
//       const user = {
//         status: req.body.status,
//       };
//       const { error } = validateStatusInput(req.body);

//       if (error) {
//         return res.status(400).json({
//           status: 400,
//           message: error.message,
//         });
//       }
//       return res.status(200).json({
//         status: 200,
//         data: {
//           accountNo: account.accountNo,
//           status: user.status,
//         },
//       });
//     } catch (e) {
//       return res.status(500).json({
//         status: 500,
//         error: 'Sorry, something went wrong, try again',
//       });
//     }
//   }

//   /**
//    * Toggle Account Status V2
//    * @param {*} req
//    * @param {*} res
//    */
//   static async changeStatus(req, res) {
//     try {
//       const update = 'UPDATE accountstable SET status = $1 WHERE accountnumber = $2 returning *';
//       const updatedStatus = await Db.query(update, [req.body.status, parseInt(req.params.accountNo, 10)]);
//       await Db.query('COMMIT');
//       return res.status(200).json({
//         status: 200,
//         data: {
//           accountNo: updatedStatus.rows[0].accountnumber,
//           status: updatedStatus.rows[0].status,
//         },
//       });
//     } catch (e) {
//       return res.status(500).json({
//         status: 500,
//         error: 'Sorry, something went wrong, try again',
//       });
//     }
//   }

//   /**
//    * Delete a bank account V1
//    * @param {*} req
//    * @param {*} res
//    */
//   static deleteAnAccount(req, res) {
//     try {
//       const account = accounts.find(c => c.accountNo === parseInt(req.params.accountNo, 10));
//       if (!account) {
//         return res.status(404).json({
//           status: 404,
//           error: 'Account not found',
//           message: 'Account not found',
//         });
//       }

//       const index = accounts.indexOf(account);
//       accounts.splice(index, 1);
//       return res.json({
//         status: 200,
//         message: 'Account deleted successfully',
//       });
//     } catch (e) {
//       return res.status(500).json({
//         status: 500,
//         error: 'Sorry, something went wrong, try again',
//       });
//     }
//   }

//   /**
//    * Delete a bank account V2
//    * @param {*} req
//    * @param {*} res
//    */
//   static async deleteAccount(req, res) {
//     try {
//       await Db.query('DELETE FROM accountstable WHERE accountnumber = $1 returning *', [parseInt(req.params.accountNo, 10)]);
//       await Db.query('COMMIT');
//       return res.json({
//         status: 200,
//         message: 'Account deleted successfully',
//       });
//     } catch (e) {
//       return res.status(500).json({
//         status: 500,
//         error: 'Sorry, something went wrong, try again',
//       });
//     }
//   }

//   /**
//    * Get all Transactions for an account(V2)
//    * @param {*} req
//    * @param {*} res
//    */
//   static async getTransactionsHistory(req, res) {
//     try {
//       const select = await Db.query('SELECT id, CAST(createdon as DATE), type, CAST(accountnumber as INTEGER), CAST(amount as FLOAT), CAST(oldbalance as FLOAT), CAST(newbalance as FLOAT) FROM transactions WHERE accountnumber = $1', [parseInt(req.params.accountNo, 10)]);
//       return res.json({
//         status: 200,
//         data: select.rows,
//       });
//     } catch (e) {
//       return res.status(500).json({
//         status: 500,
//         error: 'Sorry, something went wrong, try again',
//       });
//     }
//   }

//   /**
//    * Get an account's details(V2)
//    * @param {*} req
//    * @param {*} res
//    */
//   static async getspecificAccount(req, res) {
//     try {
//       const getOwner = await Db.query('SELECT createdon, CAST(accountnumber as INTEGER), type, status, CAST(balance as FLOAT), owner FROM accountstable WHERE accountnumber = $1', [parseInt(req.params.accountNo, 10)]);
//       const getOwnerEmail = await Db.query('SELECT email FROM userstable WHERE id = $1', [parseInt(getOwner.rows[0].owner, 10)]);
//       const balance = Number(getOwner.rows[0].balance).toFixed(2);
//       return res.json({
//         status: 200,
//         data: {
//           createdOn: getOwner.rows[0].createdon,
//           accountNumber: parseInt(req.params.accountNo, 10),
//           ownerEmail: getOwnerEmail.rows[0].email,
//           type: getOwner.rows[0].type,
//           status: getOwner.rows[0].status,
//           balance: parseFloat(balance),
//         },
//       });
//     } catch (e) {
//       return res.status(500).json({
//         status: 500,
//         error: 'Sorry, something went wrong, try again',
//       });
//     }
//   }

//   /**
//    * Get all bank accounts(V2)
//    * @param {*} req
//    * @param {*} res
//    */
//   static async getAllAccounts(req, res) {
//     try {
//       if (req.query.status === 'active') {
//         const { rows } = await Db.query('SELECT accountstable.createdon, CAST(accountstable.accountnumber as INTEGER), userstable.email, accountstable.type, accountstable.status, CAST(accountstable.balance as FLOAT) from accountstable inner join userstable on accountstable.owner = userstable.id WHERE status = $1', ['active']);
//         return res.status(200).json({
//           status: 200,
//           data: rows,
//         });
//       }
//       if (req.query.status === 'dormant') {
//         const { rows } = await Db.query('SELECT accountstable.createdon, CAST(accountstable.accountnumber as INTEGER), userstable.email, accountstable.type, accountstable.status, CAST(accountstable.balance as FLOAT) from accountstable inner join userstable on accountstable.owner = userstable.id WHERE status = $1', ['dormant']);
//         return res.status(200).json({
//           status: 200,
//           data: rows,
//         });
//       }
//       const { rows } = await Db.query('SELECT accountstable.createdon, CAST(accountstable.accountnumber as INTEGER), userstable.email, accountstable.type, accountstable.status, CAST(accountstable.balance as FLOAT) from accountstable inner join userstable on accountstable.owner = userstable.id');
//       return res.status(200).json({
//         status: 200,
//         data: rows,
//       });
//     } catch (error) {
//       return error;
//     }
//   }
// }
// export default AccountController;
