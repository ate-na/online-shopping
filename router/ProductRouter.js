const express=require('express');
const router=express.Router()

const Productcontroller=require('../controller/Productcontroller')
const upload=require('../middleware/upload')
const {authenticate}=require('../middleware/authenticate')


router.get('/',Productcontroller.getAllproducts)
router.get('/get',authenticate,Productcontroller.getproduct)
router.post('/create',Productcontroller.createProduct)
router.post('/update',authenticate,Productcontroller.updateProduct)
router.post('/delete',authenticate,Productcontroller.deleteProduct)


module.exports=router