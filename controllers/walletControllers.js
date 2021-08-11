const EWallet = require('./../models/ewallets.model');

const walletControllers = {
  createEWallet: (req, res) => {
    const {user_id} = req.user;
    const data = {
      user_id,
      balance: 0
    }

    EWallet.create(data, (err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      } else {
        return res.status(200).json({
          success: true,
          wallet: data
        })
      }
    })
  }
}

module.exports = walletControllers;