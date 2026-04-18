const express=require('express')



const router=express.Router()
const {authenticateUser,authorizePermission}=require('../middleware/authentication')

const {getAlluser,getSingleuser,showUser,updateUser,updateUserpassword}=require('../controllers/user')


router.route('/').get(authenticateUser,authorizePermission('admin','owner'),getAlluser)

router.route('/showMe').get(authenticateUser,showUser)

router.route('/updateUser').patch(authenticateUser,updateUser)
router.route('/updateUserPassword').patch(authenticateUser,updateUserpassword)

router.route('/:id').get(authenticateUser,getSingleuser)
module.exports=router