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

module.exports = Withdrawal;