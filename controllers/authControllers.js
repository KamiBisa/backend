const User = require('./../models/users.model');

exports.create = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    is_verified: 1
  })

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message
      })
    } else {
      res.send(data);
    }
  })
}