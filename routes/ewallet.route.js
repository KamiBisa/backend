const router = require('express').Router();
const walletControllers = require('./../controllers/walletControllers');
const {isAuthenticated, authorizeRoles} = require('./../middlewares/auth');

router.route('/postCreateEWallet').post(isAuthenticated, walletControllers.createEWallet);

module.exports = router;