const express = require('express');
const userController = require('../controllers/auth');
const router = express.Router();
const verify = require('../middlewares/auth')
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/verified', verify, userController.testAuth)
module.exports = router
