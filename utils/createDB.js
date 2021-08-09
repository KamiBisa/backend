const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({
  path: './config/.env'
});

const createDB = () => {
  let config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  };

  const conn = mysql.createConnection(config);
  
  conn.connect(err => {
    if (err) throw err;
    conn.query(`CREATE DATABASE ${process.env.DB_NAME}`, (err, result) => {
      if (err) throw err;
      console.log(`Database ${process.env.DB_NAME} created.`);
      process.exit();
    })
  })
}

createDB();