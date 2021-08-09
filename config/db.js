const mysql = require('mysql');

const connectDB = () => {
  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  };

  mysql.createConnection(config).connect(err => {
    if (err) throw err;
    console.log('MySQL connected');
  })
}

module.exports = connectDB;