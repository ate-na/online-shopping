const express=require('express');
const router=express.Router()

const CategoryController=require('../controller/categoryContoller')
// const {authenticate}=require('../middleware/authenticate')
const {authenticate}=require('../controller/AuthController')


router.post('/store',authenticate,CategoryController.createCategory)
router.get('/:categoryID',authenticate,CategoryController.getcategory)


module.exports=router