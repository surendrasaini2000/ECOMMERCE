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
        const _orders= await Order.findOne({})
        res.status(StatusCodes.OK).json({_orders,count: _orders.length})
}


const getSingleOrder= async(req,res)=>{
const {id:orderId }=req.params
const _order=await Order.findOne({_id:orderId})
if (!_order)
{
    return res.status(StatusCodes.NOT_FOUND).json({ msg:`no order with id :${orderId}`})
}
//checkPermission(req.user)
res.status(StatusCodes.OK).json({_order})
}

const getCurrentUserOrders= async(req,res)=>{
        const _orders= await Order.findOne({user:req.user.userId})
        res.status(StatusCodes.OK).json({_orders,count:_orders.length})
}   




const updateOrder= async(req,res)=>{
   
    const { id:orderId}=req.params
    const {paymentIntentId}=req.body

    const _order=await Order.findOne({_id:orderId})
    if (!_order)
    {
    return res.status(StatusCodes.NOT_FOUND).json({ msg:`no order with id :${orderId}`})
    }
    _order.paymentIntentId=paymentIntentId
    _order.status='paid'
    await _order.save()

    res.status(StatusCodes.OK).json({_order})
}


module.exports={getAllOrders,getSingleOrder,getCurrentUserOrders,createOrder,updateOrder}