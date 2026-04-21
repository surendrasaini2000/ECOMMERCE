const express=require('express')
const router=express.Router()

const {authenticateUser,authorizePermission}=require('../middleware/authentication')
const {createProduct,getAllProducts,getSingleProduct,updateProduct,deleteProduct,uploadImage}=require('../controllers/productController')
const {getSingleProductReviews}=require('../controllers/reviewController')

router.route('/').get(authenticateUser,getAllProducts)
router.route('/').post(authenticateUser,authorizePermission('admin'),createProduct)
router.route('/:id').patch(authenticateUser,authorizePermission('admin'),updateProduct)
router.route('/:id').get(authenticateUser,getSingleProduct)
router.route('/:id').delete(authenticateUser,authorizePermission('admin'),deleteProduct)
router.route('/uploadImage').post(authenticateUser,authorizePermission('admin'),uploadImage)
//router.route('/:id').get(getSingleProductReviews)

module.exports=router