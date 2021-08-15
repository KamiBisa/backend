const DonationProgram = require('../models/donation_programs.model');
const Donation = require('./../models/donations.model');
const EWallet = require('./../models/ewallets.model');

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

    EWallet.findByUserId(req.user.user_id, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      } else {
        if (data.balance < amount) {
          return res.status(400).json({
            success: false,
            message: 'Not enough E-Wallet balance to donate with that amount.'
          })
        } else {
          const {wallet_id} = data;
          EWallet.deductBalance(wallet_id, amount);

          DonationProgram.findById(programId, (err, data) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message
              })
            } else {
              const {wallet_id} = data;
              EWallet.increaseBalance(wallet_id, amount);
            }
          })

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
      }
    })
  }
};

module.exports = donationControllers;