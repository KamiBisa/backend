const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
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

connectDB();
const server = app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`));

process.on('unhandledRejection', err => {
  console.log(`ERROR : ${err.message}`);
  console.log('Shutting down server due to unhandled rejection');
  server.close(() => {
    process.exit(1);
  })
})