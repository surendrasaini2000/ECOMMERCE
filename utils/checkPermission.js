
const checkPermission=(requestUserId,requestUserRole,resourseUserId)=>{
    

   if (requestUserRole==='admin')
     {
      return {status:'true' } 
    }else if (requestUserId===resourseUserId)
    {
  return {status:'true' } 
    }
    else
    {
        return {status:'false' } 
    }

    
    }





module.exports=checkPermission