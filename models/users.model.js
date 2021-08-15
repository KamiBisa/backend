const sql = require('./db/db');
const Ewallet = require('./ewallets.model');
const Notification = require('./notifications.model')

const User = function(user) {
  this.fullname = user.fullname;
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
  this.role = user.role;
}

User.create = (newUser, result) => {
  // REQUIREMENT 1
  // GIVEN I am an unregistered user
  // WHEN I register as Donor
  // THEN the system should record it as a new Donor
  if (newUser.role === 'donor')
    newUser.is_verified = true  

  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log(`Error : ${err}`);
      result(err, null);
      return;
    }
    
    // create user's ewallet after user creation
    const userWallet = new Ewallet({
      user_id: res.insertId,
      balance: 0
    })
    Ewallet.create(userWallet, (err, data) => {})
    
    // REQUIREMENT 2
    // GIVEN I am an unregistered user
    // WHEN I register as Fundraiser
    // THEN the system should notify admin that a new Fundraiser registration has been made
    if (newUser.role === 'fundraiser')
      Notification.newFundraiserAccount(res.insertId)

    result(null, {user_id: res.insertId, ...newUser});
  })
}

User.selectByUsername = (username, result) => {
  sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
    if (err) {
      console.log(`Error : ${err}`);
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

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE user_id = ${userId}`,  (err, res) => {
    if (err) {
      console.log(`Error : ${err}`);
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

User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET username = ?, password = ?, role = ?, is_verified = ? WHERE user_id = ?",
    [user.username, user.password, user.role, user.is_verified, id],
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

      // console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE user_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

module.exports = User;