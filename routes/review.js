
const express=require('express')
const router=express.Router()

const {createReview,getAllReview,getSingleReview,updateReview,deleteReview}=require('../controllers/reviewController')
const {authenticateUser}=require('../middleware/authentication')


router.route('/').post(authenticateUser,createReview)
router.route('/').get(getAllReview)
router.route('/:id').get(authenticateUser,getSingleReview)
router.route('/:id').patch(authenticateUser,updateReview)
router.route('/:id').delete(authenticateUser,deleteReview)


module.exports=router



