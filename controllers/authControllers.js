const User = require('./../models/users.model');
const Donation = require('./../models/donations.model');
const Notification = require('../models/notifications.model')
const bcrypt = require('bcrypt');
const sendToken = require('./../utils/sendToken');
const cloudinary = require('cloudinary');

const authControllers = {
  register: (req, res) => {
    const {fullname, email, avatar, username, password, role} = req.body;

    if (!username || !password || !role || !fullname || !email) {
      return res.status(400).json({
        success: false,
        message: 'Please fill up every field.'
      })
    }

    User.selectByUsername(username, async(err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          const hash_password = await bcrypt.hash(password, 12);
          const imageResult = await cloudinary.v2.uploader.upload(avatar, {
            folder: 'compfest/user',
            width: '200',
            crop: 'scale'
          })

          const user = new User({
            fullname,
            email,
            username,
            password: hash_password,
            avatar: imageResult.secure_url,
            role
          });

          User.create(user, (err, data) => {
            if (err) {
              res.status(500).json({
                success: false,
                message: err.message
              })
            } else {
              sendToken(user, 200, res, data.user_id);
            }
          })
        }
      } else {
        res.status(500).json({
          success: false,
          message: "Username has been taken before."
        })
      }
    })
  },
  login: (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
      return res.status(500).json({
        success: false,
        message: 'Please fill up every field.'
      })
    }

    User.selectByUsername(username, async(err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          return res.status(404).json({
            success: false,
            message: `Incorrect credential.`
          })
        }
      } else {
        const isPasswordMatch = await bcrypt.compare(password, data.password);
        if (!isPasswordMatch) {
          return res.status(500).json({
            success: false,
            message: 'Incorrect credential.'
          })
        }

        sendToken(data, 200, res, data.user_id)
      }
    })
  },
  logout: (req, res) => {
    res.cookie('auth_token', null, {
      expires: new Date(Date.now()),
      httpOnly: true
    })
    res.status(200).json({
      success: true,
      message: 'User has been logout.'
    })
  },
  verifyFundraiser: (req, res) => {
    const {user_id, status} = req.params;
    let newStatus
    if (status === 'verify') {
      newStatus = true
    } else if (status === 'reject') {
      newStatus = false
    }

    User.findById(user_id, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: `User with id ${user_id} not found.`
        })
      } else {
        User.updateById(user_id, {
          username: data.username,
          password: data.password,
          role: data.role,
          is_verified: newStatus
        }, (err, data) => {
          return res.status(200).json({
            success: true,
            message: `Fundraiser status with id ${user_id} has been changed.`,
            user: data
          })
        })
      }
    });
    
    notifToDelete = new Notification({
      user_id: user_id,
    })
    Notification.delete(notifToDelete)
  },
  userInfo: (req, res) => {
    const id = req.user.user_id;
    let userData = {};

    User.findById(id, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      } else {
        userData.user = data;
        Donation.findByUserId(userData.user.user_id, (err, data) => {
          if (err) {
            return res.status(400).json({
              success: false,
              message: err.message
            })
          }

          userData.history = data;
          return res.status(200).json({
            success: true,
            userData
          })
        })
      }
    })
  }
}

module.exports = authControllers;