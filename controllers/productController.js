

const product=require('../models/Product')
const {StatusCodes}=require('http-status-codes')
const path=require('path')
const createProduct=async (req,res)=>{
    try 
    {

 console.log(req.user.userId)
        req.body.user=req.user.userId
       

        const _product= await product.create(req.body)
        console.log(_product)
        res.status(StatusCodes.CREATED).json({_product})


    }
    catch(error)
    {
        console.log(error)
    }
}

const getAllProducts=async (req,res)=>{
    const _products= await product.find({})
    res.status(StatusCodes.OK).json(_products)
}

const getSingleProduct=async (req,res)=>{
    const {id:productId}=req.params
    const _products= await product.findOne({_id:productId}).populate('reviews')
    if (!_products)
    {
      return  res.status(StatusCodes.NOT_FOUND).json(`no ptoduct found with id :${productId}`)
    }

    res.status(StatusCodes.OK).json(_products)
}


const updateProduct=async (req,res)=>{
   const {id:productId}=req.params
   const _product=await product.findOneAndUpdate({_id:productId},req.body,{new:true,runValidators:true})

   if (!_product)
   {
    return res.status(StatusCodes.NOT_FOUND).json({msg:`no product found with id: ${productId}`})
   } 

   res.status(StatusCodes.OK).json({_product})

}

const deleteProduct=async (req,res)=>{
   const {id:productId}  =req.params
  const _product  = await product.findOne({_id:productId})
  if (!_product)
  {
   return res.status(StatusCodes.NOT_FOUND).json({msg:`no product found with id: ${productId}`})
  }

  await product.deleteOne({_id:productId})
    res.status(StatusCodes.OK).json({msg:" successfully Removed "})
}

const uploadImage=async (req,res)=>{
 if(!req.files)
 {
  return  res.status(StatusCodes.BAD_REQUEST).json({msg:"No File uplaod"})
 }

 const productImage= res.files.image
 console.log(productImage)
 if (productImage.mimetype.startsWith('image'))
 { 
    return  res.status(StatusCodes.BAD_REQUEST).json({msg:"please uplpad image"})
 }


 const maxsize=1024*1024

 if (productImage.size>maxsize)
 { 
    return  res.status(StatusCodes.BAD_REQUEST).json({msg:" please uplpad image  smaller then 1mb"})

 }


 const imagePath=path.join(__dirname,'../public/upload/' +`${productImage.name} `)
console.log(imagePath)
 await productImage.mv(imagePath)
 res.status(StatusCodes.OK).json({image:`/upload/${productImage.name}`})
}


module.exports={createProduct,getAllProducts,getSingleProduct,updateProduct,deleteProduct,uploadImage }