const sql = require('./db/db');
const Notification = require('./notifications.model')

const Verification = function(verification) {
    this.user_id = verification.user_id
    this.program_id = verification.program_id
    this.withdrawal_id = verification.withdrawal_id
    this.action = verification.action
}

Verification.update = (verification, result) => {
    let query = updateQueryBuilder(verification)
    sql.query(query, (err, res) => {
        if (err) {
          console.log(`Verification update error : ${err}`);
          result(err, null);
          return;
        }

        query = selectQueryBuilder(verification)
        sql.query(query, (err, res) => {
            if (err) {
                console.log(`Verification select error : ${err}`);
                result(err, null);
                return;
            }

            result(null, res)
        })
    })
    Notification.delete(verification)
}

updateQueryBuilder = (verification) => {
    switch (true) {
        case verification.user_id != undefined:
            return `UPDATE users
                SET is_verified = ${actionToBool(verification.action)}
                WHERE user_id = ${verification.user_id}`

        case verification.program_id != undefined:
            return `UPDATE donation_programs
                SET is_verified = ${actionToBool(verification.action)}
                WHERE program_id = ${verification.program_id}`

        case verification.withdrawal_id != undefined:
            return `UPDATE withdrawals
                SET is_verified = ${actionToBool(verification.action)}
                WHERE withdrawal_id = ${verification.withdrawal_id}`
    }
}

selectQueryBuilder = (verification) => {
    switch (true) {
        case verification.user_id != undefined:
            return `SELECT user_id, username, fullname, is_verified
                FROM users
                WHERE user_id = ${verification.user_id}`

        case verification.program_id != undefined:
            return `SELECT program_id, name, description, goal, is_verified
                FROM donation_programs
                WHERE program_id = ${verification.program_id}`

        case verification.withdrawal_id != undefined:
            return `SELECT withdrawal_id, amount, timestamp, is_verified
                FROM withdrawals
                WHERE withdrawal_id = ${verification.withdrawal_id}`
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