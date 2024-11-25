import express from 'express'
import {authMiddleware } from '../middlewares/auth.middleware.js'
import { listOrders, orderStatus, paymentRazorpay, placeOrder, userOrder, verifyRazorpay } from '../controllers/order.controller.js'

const orderRouter = express.Router();

orderRouter.post("/place",placeOrder)
orderRouter.post("/verify-razor",authMiddleware, verifyRazorpay)
orderRouter.post("/userorder",authMiddleware,userOrder)
orderRouter.get("/listorder",listOrders)
orderRouter.post("/updateStatus",orderStatus)

export default orderRouter