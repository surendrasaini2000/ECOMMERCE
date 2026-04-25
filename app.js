require('dotenv').config()
const express=require('express')


const app=express()

const cookieParser=require('cookie-parser')

const fileUpload=require('express-fileupload')

const connectDB=require('../Ecommerce/db/connect')
const notfoundMiddleware=require('../Ecommerce/middleware/not-found')
const authRouter=require('../Ecommerce/routes/auth')
const userRouter=require('../Ecommerce/routes/user')
const productRouter=require('../Ecommerce/routes/productRoutes')
const reviewRouter=require('../Ecommerce/routes/review')
const orderRouter=require('../Ecommerce/routes/orderRoutes')

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./public'))
app.use(fileUpload())

app.get('/',(req,res)=>{
  
  res.send('e-commerce')
})



app.get('/api/v1',(req,res)=>{
   //console.log(req.cookies)
  console.log(req.signedCookies)
   res.send('e-commerce')
})


app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/reviews',reviewRouter)
app.use('/api/v1/orders',orderRouter)

app.use(notfoundMiddleware)

const port= process.env.PORT||3000
const start= async()=>{

try
{
  await connectDB()
 app.listen(port,console.log(`server is listing on port ${port}`))
}catch(error)
{
    console.log(error)
}



    

}


start()