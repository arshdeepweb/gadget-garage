import Stripe from 'stripe';
import {Order} from '../models/order.model.js';
import {User} from '../models/user.model.js';
import razorpay from 'razorpay'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const paymentRazorpay = async (req, res) => {
  

  try {
    // Create a new order
    const newOrder = new Order({
      userId: req.body.userId,
      items: req.body.items,
      address: req.body.address,
      amount: req.body.amount,
      payment: req.body.payment
    });

    await newOrder.save();

    // Clear user cart data
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    

    res.json({ success: true, message : "Order Placed" });
    console.log("Stripe session created successfully.");

  } catch (error) {
    console.error("Error creating order or Stripe session:", error);
    res.json({ success: false, message: "Error" });
  }
};


const placeOrder = async (req, res) => {
  console.log("run");
  const { userId, items, address, amount, payment } = req.body;
  try {

    // Check if user data and planId exist
    const userData = await User.findOne({ _id:userId });
    if (!userData || !items) {
      return res.json({ success: false, message: 'Invalid Credential' });
    }


    const newOrder = new Order({
      userId: userId,
      items: items,
      address: address,
      amount: amount,
      payment: false
    });


    const newTransaction = await newOrder.save()

    // Prepare Razorpay options
    const options = {
      amount: amount * 100, // convert to smallest currency unit
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString(),
    };

    // Create order on Razorpay
    const order = await new Promise((resolve, reject) => {
      razorpayInstance.orders.create(options, (error, order) => {
        if (error) return reject(error);
        resolve(order);
      });
    });

    // Send successful response
    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



const verifyRazorpay = async(req, res) =>{
  try {
    
    const { razorpay_order_id } = req.body

    const orderInfo = await razorpayInstance.orders.fetch( razorpay_order_id )

    if(orderInfo.status === "paid"){
      const transactionData = await Order.findById(orderInfo.receipt)
      if(transactionData.payment){
        return res.json({success:false, message:'payment Failed'})
      }

      // ADDING CREDITS

      await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

      await Order.findByIdAndUpdate(transactionData._id,{payment:true})

      res.json({success:true, message: "Order Placed"})


    }

  } catch (error) {
    
  }
}



const userOrder = async (req,res) =>{

  try {
    const orders = await Order.find({userId:req.body.userId})
    res.send({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.send({success:false, message: "Error"})
  }
  
}

const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
    res.send({success:true,data:orders})
  } catch (error) {
    console.log(error); 
    res.send({success:false,message:"Error"})
  }
}

const orderStatus = async (req, res) =>{
  try {

    const reqstatus = req.body.status
    const updateStatus = await Order.findByIdAndUpdate({_id:req.body._id},{status:reqstatus})
    res.send({success:true,message:"Update Status"})
  } catch (error) {
    console.log(error);
    res.send({success:false,message:"Error"})
  }
}

export {placeOrder, userOrder, listOrders, orderStatus, verifyRazorpay, paymentRazorpay};
