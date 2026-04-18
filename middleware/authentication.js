const {StatusCodes}=require('http-status-codes')
const {isTokenValid}=require('../utils')
const users=require('../models/User')
const jwt=require('jsonwebtoken')
const authenticateUser= async(req,res,next)=>{



const token=req.signedCookies.token
//console.log(` token: ${token}`)
if (!token)
{
 return  console.log('error , no token prsent')
}

try
{
    //let payload="";
    //console.log(' token prsent')
 //  let payload= isTokenValid({token})
     let payload =jwt.verify(token,process.env.JWT_SECRET)
       //console.log(payload)     
     //req.testUser={name:payload.usr.name,userId:payload.usr.userId,role:payload.usr.role}
     req.user={name:payload.usr.name,userId:payload.usr.userId,role:payload.usr.role}

      next()
 if (!payload)
 {
    return res.status(StatusCodes.UNAUTHORIZED).json({msg:'error in payload'})
 }

 
 
}catch(error)
{

    console.log(error)
    //return res.status(StatusCodes.UNAUTHORIZED).json({msg:error.})
}



//console.log(payload)



}



const authorizePermission=(...roles)=>{
//const authorizePermission=(req,res,next)=>{  
  
  return(req,res,next)=>{
if (!roles.includes(req.user.role))
  {
    return  res.status(StatusCodes.FORBIDDEN).json({msg:'Unauthorized to access this roure'})
  }
  console.log('authorizePermission')
next()        
  }


 

    //  if (req.user.role!=='admin')
    //  {
    //       return  res.status(StatusCodes.FORBIDDEN).json({msg:'Unauthorized to access this roure'})
    //  }


         
}


module.exports={authenticateUser,authorizePermission}

