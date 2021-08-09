const router = require('express').Router();
const authControllers = require('./../controllers/authControllers');

router.route('/').post(authControllers.create);

module.exports = router;