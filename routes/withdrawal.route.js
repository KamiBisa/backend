const router = require('express').Router();
const withdrawalControllers = require('./../controllers/withdrawalControllers');
const {isAuthenticated, authorizeRoles, isVerifiedFundraiser} = require('./../middlewares/auth');

router.route('/postWithdrawDonationProgram/:programId').post(isAuthenticated, authorizeRoles('fundraiser'), isVerifiedFundraiser, withdrawalControllers.withdrawDonationProgram);
router.route('/getVerifyWithdraw/:withdrawalId/:status').get(isAuthenticated, authorizeRoles('admin'), withdrawalControllers.verifyWithdraw);
router.route('/getAllWithdrawals').get(isAuthenticated, authorizeRoles('admin'), withdrawalControllers.allWithdrawals);

module.exports = router;