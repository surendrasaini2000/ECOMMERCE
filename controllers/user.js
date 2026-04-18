const {StatusCodes}=require('http-status-codes')
const User=require('../models/User')
const bcrypt=require('bcryptjs')
const { createTokenUser,attachCookiesToResponse,checkPermission}=require('../utils')
const getAlluser= async(req,res)=>{


    try
    {

    const _users= await User.find({}).select('-password')
    if (!_users)
    {
        res.status(StatusCodes.NOT_FOUND).json({msg:' not user found '})
    }

    res.status(StatusCodes.OK).json({_users,nos:_users.length})
    }
    catch(error)
    {
        res.status(StatusCodes.BAD_REQUEST).json({msg:error} )

    }
    
    
}


const getSingleuser=async (req,res)=>{
    
    try 

    {
        const userId=req.params.id
       const _user= await User.findOne({_id:userId}).select('-password')
     
     
       if (!_user)
       {
        res.status(StatusCodes.NOT_FOUND).json({msg:` no data found with id ${userId}`})
       }
       //console.log(req.user)
      // console.log(userId)
        const IsOk=checkPermission(req.user.userId,req.user.role,_user._id)
        console.log(IsOk)      
        if (IsOk.status==='true')
              {
                res.status(StatusCodes.OK).json(_user)
              }
              else
              {
                res.status(StatusCodes.OK).json({msg:'Not authorized to access'})
              }
       
    }
    catch(error)
    {

    }
   



}




const showUser = async(req,res)=>{
        

    res.status(StatusCodes.OK).json({user:req.user})
}



const updateUser=async (req,res)=>{
const {name,email }=req.body
    if (!name || !email)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'name and email can  not blank'})
    }

    const _user=await User.findOneAndUpdate({_id:req.user.userId},{email,name},{new:true,runValidators:true})

    const tokenUser=createTokenUser(_user)
attachCookiesToResponse({res,user:tokenUser})
   res.status(StatusCodes.OK).json({user:tokenUser})

}


const updateUserpassword=async (req,res)=>
{
   const  {oldPassword,newPassword }=req.body
   
   if (!oldPassword || !newPassword)
   {
    return res.status(StatusCodes.BAD_REQUEST).json({msg:'please provide both value'})
   }
    const _user=await User.findOne({_id:req.user.userId})
     const isPasswordCorrect=await bcrypt.compare(oldPassword,_user.password)
     if (!isPasswordCorrect)
     {
       return res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).json({msg:'invalid credentials'})

     }

          //const salt=await bcrypt.genSalt(10)
           // const hashPassword=await bcrypt.hash(password,salt) 
const salt=await bcrypt.genSalt(10)
const hashPassword=await     bcrypt.hash(newPassword,salt)         
     _user.password=hashPassword

     await _user.save()

     res.status(StatusCodes.OK).json({msg:'successfully password changed.'})
 //const isCorrectpassword=await bcrypt.compare(password,validEmail.password)
   
}


module.exports={getAlluser,getSingleuser,showUser,updateUser,updateUserpassword}