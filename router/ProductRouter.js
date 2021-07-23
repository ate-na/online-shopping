const express=require('express');
const router=express.Router()

const Productcontroller=require('../controller/Productcontroller')
const upload=require('../middleware/upload')
const {authenticate}=require('../controller/AuthController')



router.get('/',Productcontroller.getAllproducts)
router.get('/:ProductID',authenticate,Productcontroller.getproduct)
router.post('/create',upload.single('picture'),Productcontroller.createProduct)
router.post('/delete',authenticate,Productcontroller.deleteProduct)


module.exports=router