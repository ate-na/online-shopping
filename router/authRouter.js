const express=require('express')

const router=express.Router()

const AuthConroller=require('../controller/AuthController')
router.post('/register',AuthConroller.register)
router.post('/login',AuthConroller.Login)

module.exports=router