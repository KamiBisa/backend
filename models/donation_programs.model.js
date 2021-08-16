const sql = require('./db/db');
const Notification = require('./notifications.model');

const DonationProgram = function(donationProgram) {
  this.user_id = donationProgram.user_id;
  this.wallet_id = donationProgram.wallet_id;
  this.name = donationProgram.name;
  this.description = donationProgram.description;
  this.image_url = donationProgram.image_url;
  this.goal = donationProgram.goal;
}

DonationProgram.create = (newDonationProgram, result) => {
  sql.query("INSERT INTO donation_programs SET ?", newDonationProgram, (err, res) => {
    if (err) {
      console.log(`Error: ${err}`);
      result(err, null);
      return;
    }

    Notification.newDonationProgram(res.insertId);
    result(null, {program_id: res.insertId, ...newDonationProgram});
  })
}

DonationProgram.findById = (programId, result) => {
  sql.query(`SELECT * FROM donation_programs WHERE program_id = ${programId}`, (err, res) => {
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

DonationProgram.selectByVerify = (status, result) => {
  sql.query(`SELECT * FROM donation_programs WHERE is_verified = ${status}`, (err, res) => {
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

DonationProgram.selectByUserId = (userId, result) => {
  sql.query(`SELECT * FROM donation_programs WHERE user_id = ${userId}`, (err, res) => {
    if (err) {
      console.log(`Error: ${err}`);
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

DonationProgram.joinToEWallet = (programId, result) => {
  sql.query(`SELECT * FROM donation_programs JOIN ewallets ON donation_programs.wallet_id = ewallets.wallet_id WHERE donation_programs.program_id = ${programId}`, (err, res) => {
    if (err) {
      console.log(`Error: ${err}`);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }
  })
}

DonationProgram.updateById = (programId, donationProgram, result) => {
  sql.query(
    "UPDATE donation_programs SET is_verified = ? WHERE program_id = ?",
    [donationProgram.is_verified, programId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { program_id: programId, ...donationProgram });
    }
  );
};

module.exports = DonationProgram;