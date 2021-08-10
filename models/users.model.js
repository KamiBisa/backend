const sql = require('./db/db');

const User = function(user) {
  this.username = user.username;
  this.password = user.password;
  this.role = user.role;
  this.is_verified = user.is_verified
}

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log(`Error : ${err}`);
      result(err, null);
      return;
    }

    result(null, {id: res.insertId, ...newUser});
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

      console.log("updated user: ", { id: id, ...user });
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