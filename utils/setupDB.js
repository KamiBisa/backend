const query = require('./query');

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
      goal INT NOT NULL
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
      amount INT NOT NULL
    )
  `)
}

const alterTable = () => {
  query(`
    ALTER TABLE donation_programs
    ADD FOREIGN KEY(user_id) REFERENCES users(user_id)
  `)
  query(`
    ALTER TABLE donation_programs
    ADD FOREIGN KEY(wallet_id) REFERENCES ewallets(wallet_id)
  `)
  query(`
    ALTER TABLE donations
    ADD FOREIGN KEY(program_id) REFERENCES donation_programs(program_id)
  `)
  query(`
    ALTER TABLE donations
    ADD FOREIGN KEY(user_id) REFERENCES users(user_id)
  `)
}

createUserTable();
createEWalletTable();
createDonationProgramTable();
createWithdrawalTable();
createDonationTable();
alterTable();