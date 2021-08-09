const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({
  path: '../config/.env'
});

// get db credentials from config
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};
const conn = mysql.createConnection(config);

// connect to db
try {
  conn.connect(function(err) {
    if (err) throw err;
  });
} catch (err) {
  console.log(err.message);
  process.exit();
}

// wrapper for queries
const query = (queryStr) => {
  conn.query(queryStr, function (err, result) {
    if (err) throw err;
    return result;
  });
}

module.exports = query;