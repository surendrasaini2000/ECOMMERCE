const mongoose=require('mongoose')
const Product = require('./Product')

const ReviewSchema=mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,'please provide rating']
    },
    title:{
        type:String,
        trim:true,
        required:[true,'please provide review title'],
        maxlength:100
    },
    comment:{
        type:String,
        required:[true,'please provide review title'],
        
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true,
    },


},
{timesstamp:true}
)

ReviewSchema.index({product:1,user:1},{unique:true})

module.exports=mongoose.model('Review',ReviewSchema)