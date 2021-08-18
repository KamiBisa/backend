const router = require('express').Router();
const withdrawalControllers = require('./../controllers/withdrawalControllers');
const {isAuthenticated, authorizeRoles, isVerifiedFundraiser} = require('./../middlewares/auth');

// REQUIREMENT 13
// GIVEN I am a Fundraiser \
// WHEN I click withdraw on my donation program \
// THEN I can choose how much money to withdraw and the system will notify the admin that there is a new withdrawal from your program
router.route('/postWithdrawDonationProgram/:program_id').post(
    isAuthenticated,
    authorizeRoles('fundraiser'),
    isVerifiedFundraiser,
    withdrawalControllers.withdrawDonationProgram
);
router.route('/getAllWithdrawals').get(
    isAuthenticated,
    authorizeRoles('admin'),
    withdrawalControllers.allWithdrawals
);

module.exports = router;