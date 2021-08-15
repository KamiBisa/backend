const connection = require('./db')
let conn = require('./db')

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
      avatar VARCHAR(125),
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
      image_url VARCHAR(100) NOT NULL,
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
      timestamp DATE NOT NULL,
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
      timestamp DATE NOT NULL,
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

const clearDBPG = `
    DROP TABLE IF EXISTS
    users, ewallets, donations, notifications, donation_programs, withdrawals CASCADE
  `

const createUserTablePG = `
    CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      fullname VARCHAR(50) NOT NULL,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      avatar VARCHAR(125),
      password VARCHAR(125) NOT NULL,
      role VARCHAR(12) NOT NULL CHECK(role IN('donor', 'fundraiser', 'admin')),
      is_verified BOOLEAN DEFAULT NULL
    );
  `

const createEWalletTablePG = `
    CREATE TABLE ewallets (
      wallet_id SERIAL PRIMARY KEY,
      user_id INT NULL REFERENCES users(user_id),
      balance INT NOT NULL
    );
  `

const createDonationProgramTablePG = `
    CREATE TABLE donation_programs(
      program_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(user_id),
      wallet_id INT NOT NULL REFERENCES ewallets(wallet_id),
      name VARCHAR(100) NOT NULL,
      description VARCHAR(1000) NOT NULL,
      image_url VARCHAR(100) NOT NULL,
      is_verified BOOLEAN DEFAULT NULL,
      goal INT NOT NULL
    );
  `

const createWithdrawalTablePG = `
    CREATE TABLE withdrawals(
      withdrawal_id SERIAL PRIMARY KEY,
      program_id INT NOT NULL REFERENCES donation_programs(program_id),
      is_verified BOOLEAN DEFAULT NULL,
      amount INT NOT NULL,
      timestamp DATE NOT NULL
    );
  `

const createDonationTablePG = `
    CREATE TABLE donations(
      donation_id SERIAL PRIMARY KEY,
      program_id INT NOT NULL REFERENCES donation_programs(program_id),
      user_id INT NOT NULL REFERENCES users(user_id),
      timestamp DATE NOT NULL,
      amount INT NOT NULL
    );
  `

const createNotificationTablePG = `
    CREATE TABLE notifications(
      notification_id SERIAL PRIMARY KEY,
      user_id INT NULL REFERENCES users(user_id),
      program_id INT NULL REFERENCES donation_programs(program_id),
      withdrawal_id INT NULL REFERENCES withdrawals(withdrawal_id)
    );
  `

exports.initDB = () => {
  console.log("initializing db");

  if (process.env.DATABASE_URL) {
    // using pg
    console.log("postgres");
    connection.queryOrder(
      [
        clearDBPG,
        createUserTablePG,
        createEWalletTablePG,
        createDonationProgramTablePG,
        createWithdrawalTablePG,
        createDonationTablePG,
        createNotificationTablePG,
      ]
    )
  } else {
    // using mysql
    console.log("mysql");
    clearDB();
    createUserTable();
    createEWalletTable();
    createDonationProgramTable();
    createWithdrawalTable();
    createDonationTable();
    createNotificationTable();
  }

  console.log("db initialized");
}
