const DonationProgram = require('./../models/donation_programs.model');
const EWallet = require('./../models/ewallets.model');
const Notification = require('../models/notifications.model')
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

    DonationProgram.joinToEWallet(id, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      }

      return res.status(200).json({
        success: true,
        data
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
        }
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
}

module.exports = donationProgramControllers;
