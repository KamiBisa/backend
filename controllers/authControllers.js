const User = require('./../models/users.model');
const bcrypt = require('bcrypt');
const sendToken = require('./../utils/sendToken');

const authControllers = {
  register: (req, res) => {
    const {username, password, role} = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please fill up every field.'
      })
    }

    User.selectByUsername(username, async(err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          const hash_password = await bcrypt.hash(password, 12);
          const user = new User({
            username,
            password: hash_password,
            role
          });
          if (role === 'donor')
            user.is_verified = 1;
          else
            user.is_verified = 0;

          User.create(user, (err, data) => {
            if (err) {
              res.status(500).json({
                success: false,
                message: err.message
              })
            } else {
              sendToken(user, 200, res, data.id);
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
  }
}

module.exports = authControllers;