const router = require('express').Router();
const donationProgramControllers = require('./../controllers/donationProgramControllers');
const {isAuthenticated, authorizeRoles, isVerifiedFundraiser} = require('./../middlewares/auth');

router.route('/postCreateDonationProgram').post(isAuthenticated, authorizeRoles('fundraiser'), isVerifiedFundraiser, donationProgramControllers.createDonationProgram);
router.route('/getOwnDonationProgramList').get(isAuthenticated, authorizeRoles('fundraiser'), donationProgramControllers.ownDonationProgramList);
router.route('/getDonationProgramInfo/:id').get(isAuthenticated, donationProgramControllers.donationProgramInfo);
router.route('/postSetDonationProgramStatus/:id/:status').post(isAuthenticated, authorizeRoles('admin'), donationProgramControllers.setDonationProgramStatus);
router.route('/getVerifiedDonationProgram').get(donationProgramControllers.verifiedDonationProgram);

module.exports = router;