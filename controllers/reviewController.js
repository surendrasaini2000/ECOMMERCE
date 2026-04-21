const review=require('../models/Review')
const product=require('../models/Product')
const {StatusCodes}=require('http-status-codes')


const {checkPermission}=require('../utils')
const Review = require('../models/Review')

const createReview=async (req,res)=>{
        const {product:productId }=req.body
        const isValidProduct=await product.findOne({_id:productId})
        if (!isValidProduct)
        {
          return  res.status(StatusCodes.NOT_FOUND).json({msg:' No product with id :${productId}'})
        }


        const alreadySubmitted= await Review.findOne({product:productId,user:req.user.userId})

        if (alreadySubmitted)
        {
         return   res.status(StatusCodes.BAD_REQUEST).json({msg:'already submitted review from this projected'})
        }

         req.body.user=req.user.userId
         console.log(req.body)
        const _review= await review.create(req.body)
        res.status(StatusCodes.CREATED).json({_review})
}

const getAllReview=async (req,res)=>{
     
      const _review=await review.find({})
      res.status(StatusCodes.OK).json({_review,count:_review.length})
}


const getSingleReview=async (req,res)=>{
      const {id:reviewId}=req.params
    const _review=await Review.findOne({_id:reviewId})
    if (!_review)
    {
        return res.status(StatusCodes.NOT_FOUND).json({msg:` no review found with id : ${reviewId}`})
    }

    res.status(StatusCodes.OK).json({_review})

}

const updateReview=async (req,res)=>{
        res.send('update Review')
}

const deleteReview=async (req,res)=>{
        const {id:reviewId}=req.params
        const _review= await Review.findOne({_id:reviewId})

        if (!_review)
        {
             return res.status(StatusCodes.NOT_FOUND).json({ msg:` no review found with id: ${reviewId}`})
        }
       
      
      if(checkPermission(req.user.userId,req.user.role ,_review.user))
      {
            await Review.deleteOne({_id:reviewId})
           res.status(StatusCodes.OK).json({msg:` Review Deleted with Id : ${reviewId}`})
      }else{
        res.status(StatusCodes.OK).json({msg:` Somthing wrong  Id try again : ${reviewId}`})
      }

       
     
        
}



module.exports={createReview,getAllReview,getSingleReview,updateReview,deleteReview}
