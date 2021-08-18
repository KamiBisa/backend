const router = require('express').Router();
const walletControllers = require('./../controllers/walletControllers');
const {isAuthenticated, authorizeRoles} = require('./../middlewares/auth');

router.route('/postCreateEWallet').post(
    isAuthenticated, 
    authorizeRoles('donor'),
    walletControllers.createEWallet
);
router.route('/postUpdateEWallet/:id/:type').post(
    isAuthenticated, 
    authorizeRoles('donor'),
    walletControllers.updateEWallet
);

module.exports = router;