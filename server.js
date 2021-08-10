const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();

process.on('uncaughtException', err => {
  console.log(`ERROR : ${err.message}`);
  console.log('Shutting down server due to uncaught exception.');
  process.exit(1);
})

dotenv.config({
  path: './config/.env'
});

app.use(express.json());
app.use(cookieParser());

app.use('/api', require('./routes/auth.route'));

const server = app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));

process.on('unhandledRejection', err => {
  console.log(`ERROR : ${err.message}`);
  console.log('Shutting down server due to unhandled rejection');
  server.close(() => {
    process.exit(1);
  })
})