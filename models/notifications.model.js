const sql = require('./db/db');
const User = require('./../models/users.model');

const Notification = function(notification) {
    this.user_id = notification.user_id
    this.program_id = notification.program_id
    this.withdrawal_id = notification.withdrawal_id
}

Notification.create = (notification) => {
    sql.query("INSERT INTO notifications SET ?", notification, (err, res) => {
        if (err) {
          console.log(`Notifications insert error : ${err}`);
          return;
        }
    })
}

Notification.newFundraiserAccount = (user_id) => {
    const newNotif = new Notification({
        user_id: user_id
    })
    Notification.create(newNotif)
}

Notification.newDonationProgram = (program_id) => {
    const newNotif = new Notification({
        program_id: program_id
    })
    Notification.create(newNotif)
}

Notification.withdrawFunds = (withdrawal_id) => {
    const newNotif = new Notification({
        withdrawal_id: withdrawal_id
    })
    Notification.create(newNotif)
}


Notification.view = (filter, result) => {
    let joinClause = " "
    switch (filter) {
        case "fundraisers":
            joinClause += `
            JOIN users
            ON users.user_id = notifications.user_id
            WHERE notifications.user_id IS NOT NULL`
            break;
        case "programs":
            joinClause += `
            JOIN donation_programs
            ON donation_programs.program_id = notifications.program_id
            WHERE notifications.program_id IS NOT NULL`
            break;
        case "withdrawals":
            joinClause += `
            JOIN withdrawals
            ON withdrawals.withdrawal_id = notifications.withdrawal_id
            WHERE notifications.withdrawal_id IS NOT NULL`
            break;
    }

    sql.query("SELECT * FROM notifications" + joinClause, (err, res) => {
        if (err) {
            console.log(`Notifications view error : ${err}`);
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

Notification.delete = (notification) => {
    let whereClause = " "
    switch (true) {
        case notification.user_id != undefined:
            whereClause += "WHERE user_id = " + notification.user_id
            break;
        case notification.program_id != undefined:
            whereClause += "WHERE program_id = " + notification.program_id
            break;
        case notification.withdrawal_id:
            whereClause += "WHERE withdrawal_id = " + notification.withdrawal_id
            break;
    }

    sql.query("DELETE FROM notifications" + whereClause + " LIMIT 1", (err) => {
        if (err) {
            console.log(`Notifications delete error : ${err}`);
        }
    })
}

module.exports = Notification
