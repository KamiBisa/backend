const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res, userId) => {
  const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });

  const options = {
    expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)),
    httpOnly: true
  };

  res.status(statusCode).cookie('auth_token', token, options).json({
    success: true,
    token,
    user: user
  })
}

module.exports = sendToken;