const express=require('express');
const router=express.Router()

const CategoryController=require('../controller/categoryContoller')
const {authenticate,grantAccess}=require('../controller/AuthController')


router.post('/store',authenticate,grantAccess('createAny','category'),CategoryController.createCategory)
router.get('/:categoryID',authenticate,CategoryController.getcategory)


module.exports=router