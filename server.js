const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const cors = require('cors');
const app = express();

process.on('uncaughtException', err => {
  console.log(`ERROR : ${err.message}`);
  console.log('Shutting down server due to uncaught exception.');
  process.exit(1);
})

dotenv.config({
  path: './config/.env'
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json({limit: '50mb'}));
app.use(cors({credentials: true, origin: '*'}));
app.use(cookieParser());

app.use('/api/authentication', require('./routes/auth.route'));
app.use('/api/ewallet', require('./routes/ewallet.route'));
app.use('/api/notification', require('./routes/notification.route'));
app.use('/api/donation_program', require('./routes/donationProgram.route'));
app.use('/api/donation', require('./routes/donation.route'));
app.use('/api/verification', require('./routes/verification.route'))
app.use('/api/withdrawal', require('./routes/withdrawal.route'));

module.exports = app;