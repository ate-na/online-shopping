const express=require('express');
const router=express.Router()

const userController=require('../controller/userController')
const {authenticate,updatePassword,grantAccess}=require('../controller/AuthController')


router.get('/profile',authenticate,userController.myProfile)
router.delete('/delete/:userId',authenticate , grantAccess('deleteAny', 'profile'), userController.deleteUser);
router.patch('/updatepassword',authenticate,updatePassword)
router.patch('/requestSellerRole',authenticate,userController.requestSellerRole)
router.patch('/acceptSellerRequest',authenticate,userController.acceptSellerRequest)
router.patch('/declineSellerRequest',authenticate,userController.declineSellerRequest)
router.get('/getSellerRequests',authenticate,userController.getSellerRequests)
router.get('/:username',authenticate,grantAccess('readAny', 'profile'),userController.otherProfile)


module.exports=router