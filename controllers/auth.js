const User=require('../models/User')
const {StatusCodes}=require('http-status-codes')
const bcrypt=require('bcryptjs')
//const jwt=require('jsonwebtoken')
//const {creatJWT}=require('../utils')

const {attachCookiesToResponse,createTokenUser}=require('../utils')



const register= async (req,res)=>{
const {email,name,password,role}=req.body
  

    if ( !name ||   !email || !password )
      { 
      return res.status(StatusCodes.BAD_REQUEST).json({msg:'please provide name email and password' })
      }   



       const emailExist  =await User.findOne({email:email})
              
       if (emailExist)
       {
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'email  already exists'})
       }
    
       const salt=await bcrypt.genSalt(10)
       const hashPassword=await bcrypt.hash(password,salt) 
       const tempUser={name,email,password:hashPassword,role}
       
    
       const _user =await User.create(tempUser)
       const usr=createTokenUser(_user)
       //console.log(usr)
       attachCookiesToResponse({res,user:{usr}})
       res.status(201).json({usr})
//res.status(StatusCodes.OK).json({user: usr}) 
       //const token=jwt.sign({userId:_user._id,name:_user.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFE_TIME})
      //  const token=creatJWT({payload:{userId:_user._id,name:_user.name}})
       //  const oneDay=1000*60*60*24   // 1 sec=1000 milisecond i day milisec.

      //  res.cookie('token',token,{
      //   httpOnly:true,
      //   expires:new Date(Date.now()+oneDay)
      //  })
       
       //res.status(StatusCodes.OK).json({user:{name:_user.name},token}) 
       //res.status(201).json({usr})
          
       


     

    
}



const login= async(req,res)=>{

  const {email,password}=req.body
  if (!email || !password)
  {
    return res.status(StatusCodes.BAD_REQUEST).json({msg:'please provide email and password'})
  }

  const validEmail= await User.findOne({email})
  if  (!validEmail)
  {
    return  res.status(StatusCodes.NOT_FOUND).json({msg:'invalid email'})
  }
 
 const isCorrectpassword=await bcrypt.compare(password,validEmail.password)
  if (!isCorrectpassword)
  {
      return res.status(StatusCodes.BAD_REQUEST).json({msg:'invalid   password'})
  }

       
  //const token=await jwt.sign({userId:validEmail._id,name: validEmail.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFE_TIME})
  //res.status(StatusCodes.OK).json({user:{userId:validEmail._id,name:validEmail.name},'token': token })
const usr=createTokenUser(validEmail)
       //console.log(usr)
       attachCookiesToResponse({res,user:{usr}})
       res.status(201).json({usr})


}

const logout= async(req,res)=>{
   res.cookie('token','logout',{
    httpOnly:true,
    expires:new Date(Date.now()),
   })
   res.status(StatusCodes.OK).json({msg:'user logged out'})
}

module.exports={register,login,logout}

