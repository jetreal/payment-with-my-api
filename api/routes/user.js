const express = require('express')
const router = express.Router()


const UserController = require('../controllers/user')
const TransactionController = require('../controllers/transactions')
const checkAuth = require('../middleware/check-auth')


router.get('/get-transactions', checkAuth, TransactionController.get_transactions)

router.post('/send-transaction', checkAuth, TransactionController.set_transactions)

router.post('/users', checkAuth, UserController.get_all_users )

router.get('/user-info', checkAuth, UserController.get_logged_user_info )

router.post('/signup', UserController.user_signup )

router.post('/login', UserController.user_login)

router.delete('/:userId', checkAuth, UserController.user_delete);


module.exports = router;