// const bcrypt = require('bcrypt')
const config = require('config');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('../models/user');
// const TransactionHistory = require('../models/transaction');



exports.set_transactions = (req, res, next) => {
  // вычисление даты
  const date = new Date()
  const transDate = (`${date.toLocaleDateString()} | ${date.toLocaleTimeString()}s`)

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, config.get('jwtSecret'));
  User.find()
    .exec()
    .then(users => {
      const isFind = users.find(user => user.username === req.body.name)
      if (isFind === undefined) {
        return (res.status(404).json({
          message: "current user not found"
        }))
      }

    })
    .catch(err => console.log(err))

  User.find({ email: decoded.email })
    .exec()
    .then(async user => {
      if (user.length === 0) {
        return (res.status(404).json({
          message: "current user not found"
        }))
      }
      if (user[0].balance < +req.body.amount) {
        return (res.status(400).json({
          message: "balance exceeded"
        }))
      }

      await User.updateOne(
        user[0],
        user[0].transactions.length === 0 ?
          {
            balance: (user[0].balance) - (+req.body.amount),
            transactions: [
              {
                // _id: new mongoose.Types.ObjectId(),
                id: 1,
                transUsername: req.body.name,
                amount: -(req.body.amount),
                date: transDate,
                balance: (user[0].balance) - (+req.body.amount)
              }]
          } : {
            balance: (user[0].balance) - (+req.body.amount),
            transactions: [...user[0].transactions,
            {
              // _id: new mongoose.Types.ObjectId(),
              id: user[0].transactions.length + 1,
              transUsername: req.body.name,
              amount: -(req.body.amount),
              date: transDate,
              balance: (user[0].balance) - (+req.body.amount)
            }]
          }, null, cb
      );

      async function cb() {
        User.findOne({ username: req.body.name })
          .exec()
          .then(async recipient => {
            await User.updateOne({ username: req.body.name },
              recipient.transactions.length === 0 ?
              { 
                balance: (recipient.balance) + (+req.body.amount),
                transactions: [
                  {
                    // _id: new mongoose.Types.ObjectId(),
                    id: 1,
                    transUsername: user[0].username,
                    amount: (req.body.amount),
                    date: transDate,
                    balance: (recipient.balance) + (+req.body.amount)
                  }]
              } : {
                  balance: (recipient.balance) + (+req.body.amount),
                  transactions: [...recipient.transactions,
                  {
                    // _id: new mongoose.Types.ObjectId(),
                    id: recipient.transactions.length + 1,
                    transUsername: user[0].username,
                    amount: +(req.body.amount),
                    date: transDate,
                    balance: (recipient.balance) + (+req.body.amount)
                  }]
                
              })
          })
          .catch(err => console.log(err))

        await User.find({ email: decoded.email })
          .exec()
          .then(user => {
            return (res.status(200).json({
              trans_token: {
                id: user[0].transactions[user[0].transactions.length - 1].id,
                amount: user[0].transactions[user[0].transactions.length - 1].amount,
                date: user[0].transactions[user[0].transactions.length - 1].date,
                balance: user[0].balance,
                username: user[0].transactions[user[0].transactions.length - 1].transUsername
              },
              message: 'transaction saved'
            }))
          })
          .catch(err => console.log(err))
      }

    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      })
    });

}


exports.get_transactions = (req, res, next) => {
    // console.log( req.headers)
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.get('jwtSecret'));
  
    // console.log(decoded)
    User.find({ email: decoded.email })
      .exec()
      .then(user => (res.status(200).json({
        trans_token: user[0].transactions
      })))
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        })
      });
}