const sql = require('./db/db');

const Verification = function(verification) {
    this.user_id = verification.user_id
    this.program_id = verification.program_id
    this.withdrawal_id = verification.withdrawal_id
    this.action = verification.action
}

Verification.update = (notification, result) => {
    let query = updateQueryBuilder(notification)
    sql.query(query, (err, res) => {
        if (err) {
          console.log(`Verification update error : ${err}`);
          result(err, null);
          return;
        }

        query = selectQueryBuilder(notification)
        sql.query(query, (err, res) => {
            if (err) {
                console.log(`Verification select error : ${err}`);
                result(err, null);
                return;
            }

            result(null, res)
        })
    })
}

updateQueryBuilder = (notification) => {
    switch (true) {
        case notification.user_id != undefined:
            return `UPDATE users
                SET is_verified = ${actionToBool(notification.action)}
                WHERE user_id = ${notification.user_id}`

        case notification.program_id != undefined:
            return `UPDATE donation_programs
                SET is_verified = ${actionToBool(notification.action)}
                WHERE program_id = ${notification.program_id}`

        case notification.withdrawal_id != undefined:
            return `UPDATE withdrawals
                SET is_verified = ${actionToBool(notification.action)}
                WHERE withdrawal_id = ${notification.withdrawal_id}`
    }
}

selectQueryBuilder = (notification) => {
    switch (true) {
        case notification.user_id != undefined:
            return `SELECT user_id, username, fullname, is_verified
                FROM users
                WHERE user_id = ${notification.user_id}`

        case notification.program_id != undefined:
            return `SELECT program_id, name, description, goal, is_verified
                FROM donation_programs
                WHERE program_id = ${notification.program_id}`

        case notification.withdrawal_id != undefined:
            return `SELECT withdrawal_id, amount, timestamp, is_verified
                FROM withdrawals
                WHERE withdrawal_id = ${notification.withdrawal_id}`
    }
}

actionToBool = (action) => {
    if (action === "verify") {
        return true
    } else if (action === "reject") {
        return false
    }
}

module.exports = Verification