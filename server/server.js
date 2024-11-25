import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import productRouter from './routes/product.route.js'
import userRouter from './routes/user.route.js'
import 'dotenv/config'
import {cartRouter} from './routes/cart.router.js'
import orderRouter from './routes/order.router.js'

// config

const app = express()
const port = process.env.PORT || 4000

// middleware

app.use(cors({
  origin: {
    target:"https://gadgetgarageshop.vercel.app",
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If your frontend is sending cookies or authentication headers
  optionsSuccessStatus: 204 // For legacy browser support
}));
app.use(express.json())

// database connection
connectDB();

// api endpoints
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/",(req,res)=>{
  res.send("Api Working")
})
app.get("/insta",(req,res)=>{
  res.send("Instagram")
})

app.listen(port,()=>{
  console.log(`server is started from http://localhost:${port}`)
})