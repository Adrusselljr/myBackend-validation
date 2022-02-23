const express = require('express');
const router = express.Router();
const { createUser, userLogin } = require('./controller/userController')
const { checkIsEmpty, jwtMiddleware, validateCreate, validateLogin, validateUpdate} = require('./lib/authMiddleware/index')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello World!');
});

router.post('/create-user', checkIsEmpty, validateCreate, createUser)
router.post('/login', checkIsEmpty, validateLogin, userLogin)
router.post('/update-profile', jwtMiddleware, checkIsEmpty, validateUpdate)

module.exports = router;