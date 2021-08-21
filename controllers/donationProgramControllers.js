const DonationProgram = require('./../models/donation_programs.model');
const EWallet = require('./../models/ewallets.model');
const Notification = require('../models/notifications.model')
const Donation = require('./../models/donations.model');
const User = require('./../models/users.model');
const cloudinary = require('cloudinary');

const donationProgramControllers = {
  createDonationProgram: (req, res) => {
    const {description, name, image, goal} = req.body;

    if (!description || !name || !goal) {
      return res.status(500).json({
        success: false,
        message: 'Please provide every field.'
      })
    }

    EWallet.create({user_id: null, balance: 0}, async(err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      } else {
        const {wallet_id} = data;
        const imageResult = await cloudinary.v2.uploader.upload(image, {
          folder: 'compfest/donation_program',
          width: '800',
          crop: 'scale'
        });

        const newDonationProgram = {
          user_id: req.user.user_id,
          wallet_id,
          name,
          description,
          image_url: imageResult.secure_url,
          is_verified: null,
          goal
        }
    
        DonationProgram.create(newDonationProgram, (err, data) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message
            })
          }

          return res.status(200).json({
            success: true,
            donation_program: data
          })
        })
      }
    });
  },
  ownDonationProgramList: (req, res) => {
    DonationProgram.selectByUserId(req.user.user_id, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          return res.status(404).json({
            success: false,
            message: `No data found.`
          })
        } else {
          return res.status(500).json({
            success: false,
            message: err.message
          })
        }
      } else {
        return res.status(200).json({
          success: true,
          donation_program: data
        })
      }
    })
  },
  donationProgramInfo: (req, res) => {
    const {id} = req.params;

    // DonationProgram.joinToEWallet(id, (err, data) => {
    //   if (err) {
    //     return res.status(500).json({
    //       success: false,
    //       message: err.message
    //     })
    //   }

    //   let newData = data;

    // })
    DonationProgram.findById(id, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      }

      const newData = data;
      EWallet.findById(data.wallet_id, (err, walletData) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          })
        }
        newData.balance = walletData.balance;

        User.findById(data.user_id, (err, userData) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message
            })
          }
          newData.fundraiserName = userData.fullname;

          Donation.findByProgramId(data.program_id, (err, donationData) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message
              })
            }
            newData.donatedUser = donationData;

            return res.status(200).json({
              success: true,
              donation_program: newData
            })
          })
        })
      })
    })
  },
  setDonationProgramStatus: (req, res) => {
    const {program_id, status} = req.params;
    let newStatus
    if (status === 'verify') {
      newStatus = true
    } else if (status === 'reject') {
      newStatus = false
    }

    DonationProgram.findById(program_id, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          return res.status(404).json({
            success: false,
            message: 'Donation program not found.'
          })
        } else {
          return res.status(500).json({
            success: false,
            message: err.message
          })
        }
      } else {

        DonationProgram.updateById(program_id, {
          is_verified: newStatus
        }, (err, data) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message
            })
          }

          notifToDelete = new Notification({
            program_id: program_id,
          })
          Notification.delete(notifToDelete)

          return res.status(200).json({
            success: true,
            donation_program: data
          })
        })
      }
    })
  },
  verifiedDonationProgram: (req, res) => {
    DonationProgram.selectByVerify(true, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          return res.status(404).json({
            success: false,
            message: 'There\'s no verified donation program recently.'
          })
        } else {
          return res.status(500).json({
            success: false,
            message: err.message
          })
        }
      } else {
        const programId = [];
        data.map(d => (
          programId.push(d.program_id)
        ))
        
        const newData = data;
        for (let i = 0; i < programId.length; i++) {
          EWallet.findById(data[i].wallet_id, (err, walletData) => {
            newData[i].balance = walletData.balance;
          });

          User.findById(data[i].user_id, (err, userData) => {
            newData[i].fundraiserName = userData.fullname;
          })

          Donation.findByProgramId(programId[i], (err, donationData) => {
            newData[i].donatedUser = donationData;
            
            if (i === programId.length - 1) {
              return res.status(200).json({
                success: true,
                donation_program: newData
              })
            }
          })
        }
      }
    })
  }
}

module.exports = donationProgramControllers;
