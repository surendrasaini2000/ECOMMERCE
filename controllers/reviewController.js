const review=require('../models/Review')
const product=require('../models/Product')
const {StatusCodes}=require('http-status-codes')


const {checkPermission}=require('../utils')

const createReview=async (req,res)=>{
        res.send('create review')
}

const getAllReview=async (req,res)=>{
        res.send('get All Review')
}


const getSingleReview=async (req,res)=>{
        res.send('get Single Review')
}

const updateReview=async (req,res)=>{
        res.send('update Review')
}

const deleteReview=async (req,res)=>{
        res.send('delete Review')
}



module.exports={createReview,getAllReview,getSingleReview,updateReview,deleteReview}