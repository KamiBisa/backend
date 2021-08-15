const Donation = require('./../models/donations.model');

const donationControllers = {
  donate: (req, res) => {
    const {amount} = req.body;
    const {programId} = req.params;

    if (!amount) {
      return res.status(500).json({
        success: false,
        message: 'Please provide the amount that wish to be donated.'
      })
    }

    if (amount <= 0) {
      return res.status(500).json({
        success: false,
        message: 'Amount shouldn\'t be zero value.'
      })
    }

    const donationData = {
      program_id: programId,
      user_id: req.user.user_id,
      timestamp: new Date(Date.now()),
      amount
    };

    Donation.create(donationData, (err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }

      return res.status(200).json({
        success: true,
        donation: data
      })
    })
  }
};

module.exports = donationControllers;