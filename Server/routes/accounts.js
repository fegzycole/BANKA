import express from 'express';
import testData from '../data/testData';
import Auth from '../Middleware/Auth'
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';


const router = express.Router();
const{accounts} = testData;


router.post('/',(req,res)=>{
  let token = req.body.token || req.headers['x-access-token'];   
  if(token) {
    jwt.verify(token, 'superSecret', (err, decoded) => {
      if(err) {
        return res.status(404).json({
          status: 404,
          message: err,
      })
      }
      req.decoded = decoded;
    })
  }
    const schema ={
         type: Joi.string().required().error(new Error('Select an account type please!')),
    }
    Joi.validate(req.body,schema,(err, value) => {
        if (err) {
          return res.status(400).json({
            statusCode : 400,
            message : err.message
            }
          ); 
        }
      });
      const opening_bal = parseFloat(0.00);///We need to figure out how to add this to the 
      const accountNumber = Auth.CreateNewAccount();
      const accountNo = accountNumber;
      const account = {
        accountNo,
        firstName: req.decoded.user.firstName,
        lastName: req.decoded.user.lastName,
        email: req.decoded.user.email,
        owner: req.decoded.user.id,
        type: req.body.type,
        Opening_bal: opening_bal,
      }
      
      accounts.push(account);
      res.json({
          status: 200,
          data: account});

})


router.patch('/:accountNo',(req,res)=>{
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
  if(req.decoded.isStaff===false){
    return res.json({
      status: 401,
      error: 'You do not have the rights to this resource',
      message: 'Request denied'
    });
  }
    const account = accounts.find(c=> c.accountNo === parseInt(req.params.accountNo));
    if (!account)return res.status(404).json({
      status: 404,
      error: 'Account not found',
      message: 'Account not found',
    })

    if (account.status === 'active')
    {
      account.status = 'dormant';
    }
    else{
      account.status = 'active';
    }
    accounts.push(account);
    res.json({
      status: 200,
      data: {
        accountNo: account.accountNo,
        status: account.status,
      }
    })
});


router.delete('/:accountNo',(req,res)=>{
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
  if(req.decoded.isStaff===false){
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
    
    const index = accounts.indexOf(account);
    accounts.splice(index, 1);
    res.json({
      status: 200,
      message: "Account deleted successfully",
    })



})

export default router;