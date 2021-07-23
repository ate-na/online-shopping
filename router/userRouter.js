const express=require('express');
const router=express.Router()

const userController=require('../controller/userController')
const {authenticate,updatePassword}=require('../controller/AuthController')


router.get('/profile',authenticate,userController.myProfile)
router.put('/edit',authenticate,userController.editUseInfo)
router.patch('/updatepassword',authenticate,updatePassword)


module.exports=router