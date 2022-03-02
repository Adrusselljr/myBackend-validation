const express = require('express');
const router = express.Router();
const { createUser, userLogin, updateProfile, getCurrentUser } = require('./controller/userController')
const { checkIsEmpty, jwtMiddleware, validateCreate, validateLogin, validateUpdate} = require('./lib/authMiddleware/index')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello World from usersRouter!');
});

router.post('/create-user', checkIsEmpty, validateCreate, createUser)
router.post('/login', checkIsEmpty, validateLogin, userLogin)
router.put('/update-profile', jwtMiddleware, checkIsEmpty, validateUpdate, updateProfile)
router.get('/get-current-user', jwtMiddleware, getCurrentUser)

module.exports = router;