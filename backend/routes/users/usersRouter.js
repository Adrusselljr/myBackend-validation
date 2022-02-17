var express = require('express');
var router = express.Router();
const { createUser } = require('./controller/userController')
const { checkIsEmpty } = require('./lib/authMiddleware/checkIsEmpty')
const { validateUser } = require('./lib/authMiddleware/validateCreateData')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-user', checkIsEmpty, validateUser, createUser)

module.exports = router;