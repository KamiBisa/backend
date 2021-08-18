const router = require('express').Router();
const authControllers = require('../controllers/authControllers')
const donationProgramControllers = require('../controllers/donationProgramControllers')
const withdrawalControllers = require('../controllers/withdrawalControllers')
const {isAuthenticated, authorizeRoles} = require('./../middlewares/auth');

// REQUIREMENT 3
// GIVEN I am an Admin
// WHEN there is a new proposal of Fundraiser registration
// THEN I can choose to verify or reject Fundraiser registration
router.route('/getVerifyFundraiser/:user_id/:status').get(
    isAuthenticated,
    authorizeRoles('admin'),
    authControllers.verifyFundraiser
)
// REQUIREMENT 10
// GIVEN I am an Admin
// WHEN There is a new donation program created
// THEN I can choose to verify or reject the program
router.route('/getVerifyDonationProgram/:program_id/:status').get(
    isAuthenticated,
    authorizeRoles('admin'),
    donationProgramControllers.setDonationProgramStatus
)
// REQUIREMENT 14
// GIVEN I am an Admin
// WHEN There is a new withdrawal from donation program
// THEN I can choose to reject or accept the withdrawal
router.route('/getVerifyWithdrawal/:withdrawal_id/:status').get(
    // isAuthenticated,
    // authorizeRoles('admin'),
    withdrawalControllers.verifyWithdraw
)

module.exports = router