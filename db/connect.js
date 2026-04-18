const  mongoose = require('mongoose');



//const connectionString='mongodb://127.0.0.1:27017/FEEDBACK-API';

const connectionString=process.env.DBNAME;
const connectDB=(url)=>{
return mongoose
.connect(connectionString)
.then(()=>console.log('connect to the DB....'))
.catch((err)=>console.log(err))
}




module.exports=connectDB