const mysql = require('mysql');
require('dotenv').config({path:__dirname+'/../../config/.env'});

// get db credentials from config
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};
const conn = mysql.createConnection(config);

// connect to db
const connectDB = () => {
  try {
    conn.connect(function(err) {
      if (err) throw err;
    });
  } catch (err) {
    console.log(err.message);
  }
}

const clearDB = () => {
  conn.query(`
    DROP DATABASE IF EXISTS ${process.env.DB_NAME}
  `)
  conn.query(`
    CREATE DATABASE ${process.env.DB_NAME}
  `)
  conn.query(`
    USE ${process.env.DB_NAME}
  `)
}

const createUserTable = () => {
  conn.query(`
    CREATE TABLE users (
      user_id INT PRIMARY KEY AUTO_INCREMENT,
      fullname VARCHAR(50) NOT NULL,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      avatar VARCHAR(1000),
      password VARCHAR(125) NOT NULL,
      role VARCHAR(12) NOT NULL CHECK(role IN('donor', 'fundraiser', 'admin')),
      is_verified BOOLEAN DEFAULT NULL
    )
  `);
}

const createEWalletTable = () => {
  conn.query(`
    CREATE TABLE ewallets (
      wallet_id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NULL,
      balance INT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(user_id)
    )
  `);
}

const createDonationProgramTable = () => {
  conn.query(`
    CREATE TABLE donation_programs(
      program_id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      wallet_id INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(1000) NOT NULL,
      image_url VARCHAR(1000) NOT NULL,
      is_verified BOOLEAN DEFAULT NULL,
      goal INT NOT NULL,
      FOREIGN KEY(wallet_id) REFERENCES ewallets(wallet_id),
      FOREIGN KEY(user_id) REFERENCES users(user_id)
    )
  `)
}

const createWithdrawalTable = () => {
  conn.query(`
    CREATE TABLE withdrawals(
      withdrawal_id INT PRIMARY KEY AUTO_INCREMENT,
      program_id INT NOT NULL,
      is_verified BOOLEAN DEFAULT NULL,
      amount INT NOT NULL,
      timestamp TIMESTAMP NOT NULL,
      FOREIGN KEY(program_id) REFERENCES donation_programs(program_id)
    )
  `)
}

const createDonationTable = () => {
  conn.query(`
    CREATE TABLE donations(
      donation_id INT PRIMARY KEY AUTO_INCREMENT,
      program_id INT NOT NULL,
      user_id INT NOT NULL,
      timestamp TIMESTAMP NOT NULL,
      amount INT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(user_id),
      FOREIGN KEY(program_id) REFERENCES donation_programs(program_id)
    )
  `)
}

const createNotificationTable = () => {
  conn.query(`
    CREATE TABLE notifications(
      notification_id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NULL,
      program_id INT NULL,
      withdrawal_id INT NULL,
      FOREIGN KEY(user_id) REFERENCES users(user_id),
      FOREIGN KEY(program_id) REFERENCES donation_programs(program_id),
      FOREIGN KEY(withdrawal_id) REFERENCES withdrawals(withdrawal_id)
    )
  `)
}

exports.initDB = () => {
  connectDB();
  clearDB();
  createUserTable();
  createEWalletTable();
  createDonationProgramTable();
  createWithdrawalTable();
  createDonationTable();
  createNotificationTable();
  conn.end()

  console.log("db initialized");
}
