const router = require('express').Router();
const verificationControllers = require('./../controllers/verificationControllers');
const {isAuthenticated, authorizeRoles} = require('./../middlewares/auth');

router.route('/getUpdateFundraiser/:user_id/:action').get(
    isAuthenticated,
    authorizeRoles('admin'),
    verificationControllers.updateFundraiser
)
router.route('/getUpdateProgram/:program_id/:action').get(
    isAuthenticated,
    authorizeRoles('admin'),
    verificationControllers.updateProgram
)
router.route('/getUpdateWithdrawal/:withdrawal_id/:action').get(
    isAuthenticated,
    authorizeRoles('admin'),
    verificationControllers.updateWithdrawal
)

module.exports = router