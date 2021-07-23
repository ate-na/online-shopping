const express = require('express');
const router=express.Router()

const AuthController = require('../controller/AuthController');

router.post('/signup',AuthController.signUp)
router.post('/login',AuthController.logIn)

module.exports = router;