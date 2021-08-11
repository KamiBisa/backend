const router = require('express').Router();
const walletControllers = require('./../controllers/walletControllers');
const {isAuthenticated} = require('./../middlewares/auth');

router.route('/postCreateEWallet').post(isAuthenticated, walletControllers.createEWallet);
router.route('/postUpdateEWallet/:type').post(isAuthenticated, walletControllers.updateEWallet);

module.exports = router;