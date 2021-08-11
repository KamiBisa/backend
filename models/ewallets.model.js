const sql = require('./db/db');

const EWallet = function(eWallet) {
  this.user_id = eWallet.user_id,
  this.balance = eWallet.balance
}

EWallet.create = (newEWallet, result) => {
  sql.query("INSERT INTO ewallets SET ?", newEWallet, (err, res) => {
    if (err) {
      console.log(`Error: ${err}`);
      result(err, null);
      return;
    }

    result(null, {id: res.insertId, ...newEWallet});
  })
}

EWallet.findById = (walletId, result) => {
  sql.query(`SELECT * FROM ewallets WHERE wallet_id = ${walletId}`, (err, res) => {
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

EWallet.updateById = (id, wallet, result) => {
  sql.query("UPDATE ewallets SET balance = ? WHERE wallet_id = ?", [wallet.balance, id], (err, res) => {
    if (err) {
      console.log(`Error: ${err}`);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({kind: "not_found"}, null);
      return;
    }

    result(null, {id: id, ...wallet});
  })
}

module.exports = EWallet;