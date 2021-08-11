const router = require('express').Router();
const authControllers = require('./../controllers/authControllers');
const {isAuthenticated, authorizeRoles} = require('./../middlewares/auth');

router.route('/postRegister').post(authControllers.register);
router.route('/postLogin').post(authControllers.login);
router.route('/getLogout').get(isAuthenticated, authControllers.logout);
router.route('/postVerifyFundraiser/:id/:verify').post(isAuthenticated, authorizeRoles('admin'), authControllers.verifyFundraiser);
router.route('/getUserInfo').get(isAuthenticated, authControllers.userInfo);

module.exports = router;