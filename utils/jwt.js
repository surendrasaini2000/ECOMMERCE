const jwt=require('jsonwebtoken')

const creatJWT=({payload})=>{
const token= jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFE_TIME})
return token
}


const isTokenValid=({token})=>{jwt.verify(token,process.env.JWT_SECRET)}


const attachCookiesToResponse=({res,user})=>{
    const token=creatJWT({payload:user})
    const oneDay=1000*60*60*24   // 1 sec=1000 milisecond i day milisec.
       
       res.cookie('token',token,{
        httpOnly:true,
        expires:new Date(Date.now()+oneDay),
        secure:process.env.NODE_ENV==='production',
        signed:true,
       });
      // res.status(201).json({user})
      console.log(token)
}   

module.exports={creatJWT,isTokenValid,attachCookiesToResponse}

