const query = require('./query');

const clearDB = () => {
  query(`
    DROP DATABASE IF EXISTS ${process.env.DB_NAME}
  `)
  query(`
    CREATE DATABASE ${process.env.DB_NAME}
  `)
  query(`
    USE ${process.env.DB_NAME}
  `)
}

const createUserTable = () => {
  query(`
    CREATE TABLE users (
      user_id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(125) NOT NULL,
      role VARCHAR(12) NOT NULL,
      is_verified INT NOT NULL
    )
  `);
}

const createEWalletTable = () => {
  query(`
    CREATE TABLE ewallets (
      wallet_id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      balance INT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(user_id)
    )
  `);
}

const createDonationProgramTable = () => {
  query(`
    CREATE TABLE donation_programs(
      program_id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      wallet_id INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      image_url VARCHAR(100) NOT NULL,
      is_verified INT NOT NULL,
      goal INT NOT NULL,
      FOREIGN KEY(wallet_id) REFERENCES ewallets(wallet_id),
      FOREIGN KEY(user_id) REFERENCES users(user_id)
    )
  `)
}

const createWithdrawalTable = () => {
  query(`
    CREATE TABLE withdrawals(
      withdrawal_id INT PRIMARY KEY AUTO_INCREMENT,
      program_id INT NOT NULL,
      is_verified INT NOT NULL,
      amount INT NOT NULL,
      timestamp DATE NOT NULL,
      FOREIGN KEY(program_id) REFERENCES donation_programs(program_id)
    )
  `)
}

const createDonationTable = () => {
  query(`
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

exports.initDB = () => {
  clearDB();
  createUserTable();
  createEWalletTable();
  createDonationProgramTable();
  createWithdrawalTable();
  createDonationTable();

  console.log("db initialized");
}
