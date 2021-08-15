const router = require('express').Router();
const donationControllers = require('./../controllers/donationControllers');
const {isAuthenticated} = require('./../middlewares/auth');

router.route('/postDonate/:programId').post(isAuthenticated, donationControllers.donate);

module.exports = router;