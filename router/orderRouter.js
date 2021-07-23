const express=require('express');
const router=express.Router()

const orderController=require('../controller/orderController')
const {authenticate}=require('../controller/AuthController')

router.post('/delete-cart',authenticate,orderController.deleteInCart)
router.post('/add-cart',authenticate,orderController.addToCart)
router.post('/add-order',authenticate,orderController.createOrder)
router.post('/delete-order/:OrderID',authenticate,orderController.deleteOrder)

module.exports=router