const express=require('express')
const router=express.Router()

const {authenticateUser,authorizePermission}=require('../middleware/authentication')
const {getSingleOrder,getAllOrders,createOrder,getCurrentUserOrders,updateOrder,}=require('../controllers/orderController')

router.route('/').post(authenticateUser,createOrder)
router.route('/').get(authenticateUser,authorizePermission('admin'),getAllOrders)
router.route('/showallMyOrders').get(authenticateUser,getCurrentUserOrders)
router.route('/:id').get(authenticateUser,getSingleOrder)
router.route('/:id').patch(authenticateUser,updateOrder)



module.exports=router

