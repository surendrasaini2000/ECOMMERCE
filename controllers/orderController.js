const Product=require('../models/Product')
const Order=require('../models/Order')

const {StatusCodes}=require('http-status-codes')

const {checkPermission}=require('../utils')


const fakeStripeAPI=async ({amount,currency})=>{
    const client_secret='someRandomValue'
    return {client_secret,amount}

}

const createOrder= async(req,res)=>{
    const {items:cartItems,tax,shippingFee}=req.body
  
    if (!cartItems || cartItems.length<1)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: ` no cart item provided. `})
    }

    if (!tax || !shippingFee)
        {
               return res.status(StatusCodes.BAD_REQUEST).json({msg: ` please provide tax and shipping fee. `})
        } 

    let orderItems=[]
    let subtotal=0
    
   for(const item of cartItems)
   {
    const dbProduct = await Product.findOne({_id:item.product})
        if (!dbProduct)
        {
            return res.status(StatusCodes.NOT_FOUND).json({msg:` No product with id : ${item.product}`})
        }

     const {name,price,image,_id}=dbProduct
     //console.log(name,price,image,_id)
            const singleOrderItem={
                amount:item.amount,
                name,
                price,
                image,
                product:_id
              
             }
              // add item to order  
               orderItems=[...orderItems,singleOrderItem]
               // calculation subtotal
               subtotal+=item.amount*price
           }

           //calcualte total
           const total=tax+shippingFee+subtotal
           //get clien secret

           const paymentIntent=  await fakeStripeAPI({
            amount:total,
            currency:'usd'
           })
                

const order=await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret:paymentIntent.client_secret,
    user:req.user.userId,
})

res.status(StatusCodes.CREATED).json({order,clientSecret:order.client_secret})

           
   // res.send('createOrder')
}

const getAllOrders= async(req,res)=>{
res.send('getAllOrders')
}


const getSingleOrder= async(req,res)=>{
res.send('getSingleOrder')
}

const getCurrentUserOrders= async(req,res)=>{
res.send('getC urrent User Orders')
}



const updateOrder= async(req,res)=>{
    res.send('updateOrder')
}


module.exports={getAllOrders,getSingleOrder,getCurrentUserOrders,createOrder,updateOrder}