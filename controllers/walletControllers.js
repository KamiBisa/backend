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
          eWallet: data
        })
      }
    })
  },
  updateEWallet: (req, res) => {
    const {type} = req.params;
    const {user_id} = req.user;

    EWallet.findByUserId(user_id, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          return res.status(404).json({
            success: false,
            message: `E-Wallet with userId ${user_id} not found.`
          })
        } else {
          return res.status(500).json({
            success: false,
            message: err.message
          })
        }
      } else {
        let balance = data.balance;
        const walletId = data.wallet_id;

        if (type === 'increase') 
          balance += req.body.balance;
        else {
          if ((balance === 0) || (balance - req.body.balance < 0)) {
            return res.status(400).json({
              success: false,
              message: 'Can\'t deduct balance.'
            })
          }
          balance -= req.body.balance;
        }

        EWallet.updateByUserId(user_id, {balance}, (err, data) => {
          if (err)
            return res.status(500).json({
              success: false,
              message: err.message
            })

          return res.status(200).json({
            success: true,
            eWallet: {
              wallet_id: walletId,
              ...data
            }
          })
        })
      }
    })
  }
}

module.exports = walletControllers;