const sql = require('./db/db');

const Donation = function(donation) {
  this.program_id = donation.program_id;
  this.user_id = donation.user_id;
  this.timestamp = donation.timestamp;
  this.amount = donation.amount;
}

Donation.create = (newDonation, result) => {
  sql.query("INSERT INTO donations SET ?", newDonation, (err, res) => {
    if (err) {
      console.log(`Error: ${err}`);
      result(err, null);
      return;
    }

    result(null, {donation_id: res.insertId, ...newDonation});
  })
}

Donation.findByUserId = (userId, result) => {
  sql.query(`SELECT * FROM donations WHERE user_id = ${userId}`, (err, res) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    result({kind: "not_found"}, null);
  })
}

module.exports = Donation;