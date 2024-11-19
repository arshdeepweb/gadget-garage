import express from 'express'
import multer from 'multer'
import { addProduct, listProduct, removeProduct } from '../controllers/product.controllers.js'

const productRouter = express.Router()

// image storage engine 


productRouter.post("/add", addProduct)
productRouter.get("/list", listProduct)
productRouter.post("/remove", removeProduct)

export default productRouter


