const router = require('express').Router();
const donationControllers = require('./../controllers/donationControllers');
const {isAuthenticated, authorizeRoles} = require('./../middlewares/auth');

// REQUIREMENT 6
// GIVEN I am a Donor
// WHEN I click donate on a verified donation program
// THEN I can donate money using the balance on my e-wallet
router.route('/postDonate/:programId').post(
    isAuthenticated,
    authorizeRoles('donor'),
    donationControllers.donate
);
// REQUIREMENT 7
// GIVEN I am a Donor
// WHEN I visit my dashboard
// THEN I can see list of my past donations
router.route('/getPastDonations').get(
    isAuthenticated,
    authorizeRoles('donor'),
    donationControllers.pastDonations
)

module.exports = router;