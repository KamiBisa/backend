const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({
  path: './config/.env'
});

const query = (queryStr) => {
  try {
    const config = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    };
  
    const conn = mysql.createConnection(config);
    conn.connect(function(err) {
      if (err) throw err;
      conn.query(queryStr, function (err, result) {
        if (err) throw err;
        return result;
      });
    });
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
}

module.exports = query;