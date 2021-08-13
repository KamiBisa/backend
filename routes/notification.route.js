const router = require('express').Router();
const notifControllers = require('../controllers/notifControllers');
const {isAuthenticated, authorizeRoles} = require('../middlewares/auth');

router.route('/view').get(
    isAuthenticated,
    authorizeRoles('admin'),
    notifControllers.viewAll
)
router.route('/view/fundraisers').get(
    isAuthenticated,
    authorizeRoles('admin'),
    notifControllers.viewFundraisers
)
router.route('/view/programs').get(
    isAuthenticated,
    authorizeRoles('admin'),
    notifControllers.viewPrograms
)
router.route('/view/withdrawals').get(
    isAuthenticated,
    authorizeRoles('admin'),
    notifControllers.viewWithdrawals
)

module.exports = router
