import express from 'express';
import jwt from 'jsonwebtoken';
import testData from '../data/testData';


const router = express.Router();
const {transaction,accounts} = testData;

router.post('/:accountNo/credit',)


router.post('/:accountNo/debit',(req,res)=>{
    let token = req.body.token || req.headers['x-access-token'];   
    if(token) {
      jwt.verify(token, 'superSecret', (err, decoded) => {
        if(err) {
          return res.status(404).json({
            status: 404,
            message: err,
        })
        }
        req.decoded = decoded.user;
      })
    }
    if(req.decoded.isStaff===false||req.decoded.isAdmin===true){
      return res.json({
        status: 401,
        error: 'You do not have the rights to this resource',
        message: 'Request denied'
      });
    }
 
      const account = accounts.find(c=> c.accountNo === parseInt(req.params.accountNo));
      console.log(2,parseInt(req.params.accountNo))
      if (!account)return res.status(404).json({
        status: 404,
        error: 'Account not found',
        message: 'Account not found',
      })

      const acctBal = account.balance;
      console.log(5,acctBal);
      const amountToDeposit = req.body.amountToDeposit;
      if (acctBal<amountToDeposit){
        return res.json({
           status: 404,
           message: 'Insufficient funds',
        })
     }
      const newBal = acctBal - amountToDeposit;
      const newTransaction ={
        id: transaction.length + 1,
        type: 'debit',
        balance: newBal,
        cashier: req.decoded.id,
        amount: req.body.amountToDeposit,
    }
      console.log(6,newBal);
      transaction.push(newTransaction);
        res.json({
            status: 200,
            data: {
                transactionId: newTransaction.id,
                accountNumber: JSON.stringify(account.accountNo),
                amount: newTransaction.amount,
                cashier: newTransaction.cashier,
                transactionType: newTransaction.type,
                accountBalance: newTransaction.balance,
            },
          })
})


export default router;