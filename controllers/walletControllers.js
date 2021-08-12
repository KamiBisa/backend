const EWallet = require('./../models/ewallets.model');

const walletControllers = {
  createEWallet: (req, res) => {
    const {user_id} = req.body;

    let data = {
      balance: 0
    }

    if (user_id) {
      data.user_id = user_id;
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
    const {id, type} = req.params;

    EWallet.findById(id, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          return res.status(404).json({
            success: false,
            message: `E-Wallet with id ${id} not found.`
          })
        } else {
          return res.status(500).json({
            success: false,
            message: err.message
          })
        }
      } else {
        let balance = data.balance;
        const user_id = data.user_id

        if (type === 'increase') 
          balance += req.body.balance;
        else if (type === 'decrease') {
          if ((balance === 0) || (balance - req.body.balance < 0)) {
            return res.status(400).json({
              success: false,
              message: 'Can\'t deduct balance.'
            })
          }
          balance -= req.body.balance;
        }

        EWallet.updateById(id, {balance}, (err, data) => {
          if (err)
            return res.status(500).json({
              success: false,
              message: err.message
            })

          return res.status(200).json({
            success: true,
            eWallet: {
              user_id,
              ...data
            }
          })
        })
      }
    })
  }
}

module.exports = walletControllers;