const router = require('express').Router();
const verificationControllers = require('./../controllers/verificationControllers');
const {isAuthenticated, authorizeRoles} = require('./../middlewares/auth');

// REQUIREMENT 3
// GIVEN I am an Admin
// WHEN there is a new proposal of Fundraiser registration
// THEN I can choose to verify or reject Fundraiser registration
router.route('/getUpdateFundraiser/:user_id/:action').get(
    isAuthenticated,
    authorizeRoles('admin'),
    verificationControllers.updateFundraiser
)
// REQUIREMENT 10
// GIVEN I am an Admin
// WHEN There is a new donation program created
// THEN I can choose to verify or reject the program
router.route('/getUpdateProgram/:program_id/:action').get(
    isAuthenticated,
    authorizeRoles('admin'),
    verificationControllers.updateProgram
)
// REQUIREMENT 14
// GIVEN I am an Admin \
// WHEN There is a new withdrawal from donation program \
// THEN I can choose to reject or accept the withdrawal
router.route('/getUpdateWithdrawal/:withdrawal_id/:action').get(
    isAuthenticated,
    authorizeRoles('admin'),
    verificationControllers.updateWithdrawal
)

module.exports = router