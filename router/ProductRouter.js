const express=require('express');
const router=express.Router()

const Productcontroller=require('../controller/Productcontroller')
const upload=require('../middleware/upload')
const {authenticate,grantAccess}=require('../controller/AuthController')



router.get('/',authenticate,Productcontroller.getAllproducts)
router.get('/:ProductID',authenticate,Productcontroller.getproduct)
router.post('/create',authenticate,upload.single('picture'),grantAccess('createAny','product'),Productcontroller.createProduct)
router.put('/update/:productId',authenticate,grantAccess('updateAny','product'),Productcontroller.updateProduct)
router.delete('/delete',authenticate,grantAccess('deleteAny','product'),Productcontroller.deleteProduct)


module.exports=router