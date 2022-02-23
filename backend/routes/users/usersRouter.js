var express = require('express');
var router = express.Router();
const { createUser, userLogin, profileValid } = require('./controller/userController')
const { checkIsEmpty } = require('./lib/authMiddleware/checkIsEmpty')
const { validateUser } = require('./lib/authMiddleware/validateCreateData')
const { validateLogin } = require('./lib/authMiddleware/validateLogin.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-user', checkIsEmpty, validateUser, createUser)
router.post('/login', checkIsEmpty, validateLogin, userLogin)
router.post('/profile', profileValid)

module.exports = router;