const express=require('express');
const router=express.Router()

const CategoryController=require('../controller/categoryContoller')
const {authenticate}=require('../middleware/authenticate')


router.post('/store',authenticate,CategoryController.createCategory)
router.get('/',authenticate,CategoryController.getcategory)


module.exports=router