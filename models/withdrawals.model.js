const sql = require('./db/db');
const Notification = require('./notifications.model');

const Withdrawal = function(withdrawal) {
  this.program_id = withdrawal.program_id;
  this.amount = withdrawal.amount;
  this.timestamp = withdrawal.timestamp;
}

Withdrawal.create = (newWithdrawal, result) => {
  sql.query("INSERT INTO withdrawals SET ?", newWithdrawal, (err, res) => {
    if (err) {
      console.log(`Error: ${err}`);
      result(err, null);
      return;
    }
    Notification.withdrawFunds(res.insertId);
    result(null, {withdrawal_id: res.insertId, ...newWithdrawal});
  })
}

Withdrawal.findById = (withdrawalId, result) => {
  sql.query(`SELECT * FROM withdrawals WHERE withdrawal_id = ${withdrawalId}`, (err, res) => {
    if (err) {
      console.log(`Error: ${err}`);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({kind: "not_found"}, null);
  })
}

Withdrawal.updateById = (id, withdrawal, result) => {
  sql.query("UPDATE withdrawals SET is_verified = ?, is_done = ? WHERE withdrawal_id = ?", [withdrawal.is_verified, withdrawal.is_done, id], (err, res) => {
    if (err) {
      console.log(`Error: ${err}`);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({kind: "not_found"}, null);
      return;
    }

    result(null, {withdrawal_id: id, ...withdrawal});
  })
}

Withdrawal.getAll = result => {
  sql.query("SELECT * FROM withdrawals", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Withdrawal;