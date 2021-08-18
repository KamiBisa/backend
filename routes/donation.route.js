const router = require('express').Router();
const donationControllers = require('./../controllers/donationControllers');
const {isAuthenticated, authorizeRoles} = require('./../middlewares/auth');

router.route('/postDonate/:programId').post(
    isAuthenticated,
    authorizeRoles('donor'),
    donationControllers.donate
);
router.route('/getPastDonations').get(
    isAuthenticated,
    authorizeRoles('donor'),
    donationControllers.pastDonations
)

module.exports = router;