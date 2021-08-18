const router = require('express').Router();
const donationProgramControllers = require('./../controllers/donationProgramControllers');
const {isAuthenticated, authorizeRoles, isVerifiedFundraiser} = require('./../middlewares/auth');

router.route('/postCreateDonationProgram').post(
    isAuthenticated,
    authorizeRoles('fundraiser'),
    isVerifiedFundraiser,
    donationProgramControllers.createDonationProgram
);
// REQUIREMENT 11
// GIVEN I am a Fundraiser
// WHEN I visit my dashboard
// THEN I can see list of my donation programs
router.route('/getOwnDonationProgramList').get(
    isAuthenticated,
    authorizeRoles('fundraiser'),
    donationProgramControllers.ownDonationProgramList
);
// REQUIREMENT 5
// GIVEN I am a Donor
// WHEN I click the verified donation program
// THEN I can see the details of the verified donation program
router.route('/getDonationProgramInfo/:id').get(
    isAuthenticated,
    donationProgramControllers.donationProgramInfo
);
// REQUIREMENT 4
// GIVEN I am a Donor
// WHEN I visit the homepage
// THEN I can see list of verified donation programs
router.route('/getVerifiedDonationProgram').get(
    donationProgramControllers.verifiedDonationProgram
);

module.exports = router;