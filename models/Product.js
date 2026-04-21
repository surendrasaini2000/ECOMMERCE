const { compare } = require('bcryptjs')
const mongoose=require('mongoose')
const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide name'],
        maxlength:[100,'name can not mor then 100 charecter']
    },
    price:{
        type:Number,
        required:[true,'please  provide product price'],
        default:0
    },
    desctiption:{
        type:String,
        required:[true,'please provide product description'],
        maxlength:[1000,'desctiption can not mor then 1000 charecter']
    },
    image:{
        type:String,
        default:'/upload/example.jpg'
    },
    category:{
        type:String,
        required:[true,'please provide categoty'],
        enmu:['office','kitchen','bedroom']
    },
    company:{
        type:String,
        required:[true,'please provide company'],
        enum:{
            values:['ikea','liddy','marcos'],
            message:'{VALUE} is not supported',

        }
    },
    colors:{
        type:[String],
        default:"#FF0000",
        required:true,
    },
    freeShipping:{
        type:Boolean,
        default:false
    },
    invntory:{
        type:Number,
        required:true,
        default:15,
    },
    averageRating:{
        type:Number,
        default:0,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    }
    


},
{
    timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}
});


ProductSchema.virtual('reviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'product',
    justOne:false,
})
module.exports=mongoose.model('Product',ProductSchema)