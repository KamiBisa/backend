const jwt = require('jsonwebtoken');
const User = require('./../models/users.model');

exports.isAuthenticated = (req, res, next) => {
  const {auth_token} = req.cookies;

  if (!auth_token)
    return res.status(400).json({
      success: false,
      message: 'Please login.'
    })

  const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
  User.findById(decoded.id, (err, data) => {
    if (err) {
      console.log('err')
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      })
    } else {
      req.user = data;
      next();
    }
  })
}

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(400).json({
        success: false,
        message: `Role ${req.user.role} don't have permission to access this resource.`
      })
    }
    next();
  }
}

exports.isVerifiedFundraiser = (req, res, next) => {
  if (req.user.is_verified === null) {
    return res.status(400).json({
      success: false,
      message: 'Fundraiser is not verified yet.'
    })
  }
  next();
}