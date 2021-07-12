
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const userController = require('../controller/userController')

router.use(bodyParser())

router.post('/register',userController.register)

router.post('/login',userController.login)

module.exports = router;