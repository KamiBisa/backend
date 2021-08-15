let connection = {}

// if (process.env.DATABASE_URL) {
  // on heroku
  const { Pool } = require('pg')
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })

  connection.query = async (query) => {
    let queryResult = []
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }
      client.query(query, (err, result) => {
        release()
        if (err) {
          return console.error('Error executing query', query, err.stack)
        }
        queryResult =  result.rows
      })
    })
    return queryResult
  }

  connection.queryOrder = (queries) => {
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }

      queries.forEach(query => {
        client.query(query, (err, result) => {
          if (err) {
            return console.error('Error executing query', query, err.stack)
          }
          return result.rows
        })
      });
      release()
    })
  }

  console.log('Successfully connected to postgres db.')

// } else {
//   // on local
//   const mysql = require('mysql')
//   require('dotenv').config({path:__dirname+'/../../config/.env'})
  
//   connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
//   })
  
//   connection.connect(error => {
//     if (error) throw error;
//     console.log('Successfully connected to mysql db.')
//   })

//   connection.query = (query) => {
//     connection.query(query)
//   }
// }

module.exports = connection