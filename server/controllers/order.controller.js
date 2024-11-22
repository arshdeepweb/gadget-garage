import Stripe from 'stripe';
import { Order } from '../models/order.model.js';
import { User } from '../models/user.model.js';
import razorpay from 'razorpay';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    // Create a new order
    const newOrder = new Order({
      userId: req.body.userId,
      items: req.body.items,
      address: req.body.address,
      amount: req.body.amount,
      payment: req.body.payment,
    });

    await newOrder.save();

    // Clear user cart data
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: 'Order Placed' });
    console.log('Stripe session created successfully.');
  } catch (error) {
    console.error('Error creating order or Stripe session:', error);
    res.json({ success: false, message: 'Error' });
  }
};

const placeOrder = async (req, res) => {
  console.log('run');
  const { items, address, amount, payment } = req.body;
  try {
    // Check if user data exists or create a new user
    let user = await User.findOne({ email: address.email });
    let token = ""
    if (!user) {
      const response = await registerUser(address);
      user = response.user;
      token = response.token;
      // return res.json({ success: true, message: 'User Registered', token, user });
    }

    // Create a new order
    const newOrder = new Order({
      userId: user._id,
      items: items,
      address: address,
      amount: amount,
      payment: false,
    });

    const newTransaction = await newOrder.save();

    // Prepare Razorpay options
    const options = {
      amount: amount * 100, // convert to smallest currency unit
      currency: process.env.CURRENCY || 'INR',
      receipt: newTransaction._id.toString(),
    };

    // Create order on Razorpay
    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order, message: token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === 'paid') {
      const transactionData = await Order.findById(orderInfo.receipt);
      if (transactionData.payment) {
        return res.json({ success: false, message: 'Payment Already Verified' });
      }

      // Update payment status
      await User.findByIdAndUpdate(userId, { cartData: {} });
      await Order.findByIdAndUpdate(transactionData._id, { payment: true });

      res.json({ success: true, message: 'Order Placed Successfully' });
    } else {
      res.json({ success: false, message: 'Payment Failed' });
    }
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    res.json({ success: false, message: 'Error in Verification' });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (details) => {
  const { firstName, lastName, email, password } = details;
  try {
    if (!validator.isEmail(email)) {
      return { success: false, message: 'Enter a valid Email' };
    }

    if (password.length < 8) {
      return { success: false, message: 'Please Enter a Strong Password' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: `${firstName} ${lastName}`,
      email: email,
      password: hashPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    return { token, user, success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error registering user' };
  }
};

const userOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error fetching orders' });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error fetching orders' });
  }
};

const orderStatus = async (req, res) => {
  try {
    const { status, _id } = req.body;
    const updatedStatus = await Order.findByIdAndUpdate(_id, { status: status });
    res.json({ success: true, message: 'Status Updated' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error updating status' });
  }
};

export { placeOrder, userOrder, listOrders, orderStatus, verifyRazorpay, paymentRazorpay };
