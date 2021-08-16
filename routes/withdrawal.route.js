const router = require('express').Router();
const withdrawalControllers = require('./../controllers/withdrawalControllers');
const {isAuthenticated, authorizeRoles, isVerifiedFundraiser} = require('./../middlewares/auth');

router.route('/postWithdrawDonationProgram/:programId').post(isAuthenticated, authorizeRoles('fundraiser'), isVerifiedFundraiser, withdrawalControllers.withdrawDonationProgram);
router.route('/postVerifyWithdraw/:withdrawalId/:status').get(isAuthenticated, authorizeRoles('admin'), withdrawalControllers.verifyWithdraw);

module.exports = router;