const router = require('express').Router();
const authControllers = require('./../controllers/authControllers');
const {isAuthenticated, authorizeRoles} = require('./../middlewares/auth');

router.route('/register').post(authControllers.register);
router.route('/login').post(authControllers.login);
router.route('/logout').post(isAuthenticated, authControllers.logout);
router.route('/verify_fundraiser/:id').put(isAuthenticated, authorizeRoles('admin'), authControllers.toogleVerifyFundraiser);

module.exports = router;