const Withdrawal = require('./../models/withdrawals.model');
const EWallet = require('./../models/ewallets.model');
const DonationProgram = require('./../models/donation_programs.model');
const Notification = require('../models/notifications.model')

const withdrawalControllers = {
  withdrawDonationProgram: (req, res) => {
    const {programId: program_id} = req.params;
    const {amount} = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide the amount field.'
      })
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount number is incorrect.'
      })
    }

    DonationProgram.findById(program_id, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      } else {
        const {wallet_id} = data;
        EWallet.findById(wallet_id, (err, data) => {
          if (data.balance < amount) {
            return res.status(400).json({
              success: false,
              message: 'the withdraw amount exceeded the current E-Wallet balance.'
            })
          } else {
            const newWithdrawal = {
              program_id: program_id,
              amount,
              timestamp: new Date(Date.now())
            };

            Withdrawal.create(newWithdrawal, (err, data) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  message: err.message
                })
              }

              Notification.withdrawFunds(data.withdrawal_id)

              return res.status(200).json({
                success: true,
                withdrawal: data
              })
            })
          }
        })
      }
    })
  },
  verifyWithdraw: (req, res) => {
    const {withdrawal_id, status} = req.params;
    let newStatus
    if (status === 'verify') {
      newStatus = true
    } else if (status === 'reject') {
      newStatus = false
    }

    if (newStatus === null) {
      return res.status(400).json({
        success: false,
        message: 'Withdrawal application has been rejected.'
      })
    }

    Withdrawal.findById(withdrawal_id, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          return res.status(404).json({
            success: false,
            message: `Withdrawal with id ${withdrawal_id} not found.`
          })
        } else {
          return res.status(500).json({
            success: false,
            message: err.message
          })
        }
      } else {
        const {program_id, amount} = data;

        DonationProgram.findById(program_id, (err, data) => {
          if (err) {
            return res.status(400).json({
              success: false,
              message: err.message
            })
          } else {
            const {wallet_id, user_id} = data;

            Withdrawal.updateById(withdrawal_id, {
              is_verified: newStatus
            }, (err, data) => {
              if (err) {
                return res.status(400).json({
                  success: false,
                  message: err.message
                })
              }
            })

            // REQUIREMENT 15
            // GIVEN I am a Fundraiser
            // WHEN My withdrawal is accepted by the admin
            // THEN withdrawal value will be transferred to my e-wallet
            EWallet.deductBalance(wallet_id, amount);

            EWallet.findByUserId(user_id, (err, data) => {
              if (err) {
                return res.status(400).json({
                  success: false,
                  message: err.message
                })
              } else {
                const {wallet_id} = data;
                EWallet.increaseBalance(wallet_id, amount);

                notifToDelete = new Notification({
                  withdrawal_id: withdrawal_id,
                })
                Notification.delete(notifToDelete)

                return res.status(200).json({
                  success: true,
                  message: 'Withdrawal has been approved.'
                })
              }
            })
          }
        })
      }
    })
  },
  allWithdrawals: (req, res) => {
    Withdrawal.getAll((err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }

      return res.status(200).json({
        success: true,
        withdrawal: data
      })
    });
  }
};

module.exports = withdrawalControllers;