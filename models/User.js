const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
name:{
    type:String,
    required:[true,'please provide name'],
    minlenght:3,
    maxlenght:50,
},
email:{
    type:String,
    required:[true,'please provide email'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique:true,

}  ,
password:{
    type:String,
    required:[true,'please provide password'],
    minlenght:6,
} ,
role:{
    type:String,
    enum:['admin','user'],
    default:'user'
} 
})

module.exports=mongoose.model('User',UserSchema)