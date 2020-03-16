const bcrypt = require('bcrypt')
const config = require('config');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('../models/user');
const TransactionHistory = require('../models/transaction');




exports.get_all_users = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, config.get('jwtSecret'));

  // User.findOne({ email: decoded.email })
  //   .exec()
  //   .then(user => {
  //     currentUser = user.name
  //   })


  var re = new RegExp(`^${req.body.filter}`)
  User.find()
    .exec()
    .then(users => {

      User.findOne({ email: decoded.email })
        .exec()
        .then(user => {
          currentUser = user.username
        })
        .catch(err => console.log(err))
      const filteredUsersArr = users.filter(u => u.username.match(re))
      let userNames = filteredUsersArr.map(u => ({ id: u._id, name: u.username }))
      userNames = userNames.filter(user => user.name !== currentUser)
      return (res.status(200).json({
        userNames
      }))

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}

exports.get_logged_user_info = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, config.get('jwtSecret'));

  User.find({ email: decoded.email })
    .exec()
    .then(user => (res.status(200).json({
      username: user[0].username, balance: user[0].balance
    })))
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}

exports.user_signup = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(400).json({
          message: "A user with name already exists"
        })
      }
    })
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(400).json({
          message: "A user with that email already exists"
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              username: req.body.username,
              balance: 500
            });
            user
              .save()
              .then(result => {
                console.log(result)
                res.status(201).json({
                  message: "User created"
                })
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                })
              });
          }
        })
      }
    })
}

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id
          },
            config.get('jwtSecret'),
            {
              expiresIn: "2h"
            }
          )
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          })
        }
        return res.status(401).json({
          message: 'Auth failed'
        })
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
}

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}