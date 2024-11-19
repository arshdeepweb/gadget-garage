import { Product } from "../models/product.model.js";
import fs from 'fs'

const addProduct = async (req, res) =>{

  // let image_filename = `${req.file.filename}`;
  const {id, name, description, price,company, category, image, colors, featured} = req.body

  const food = new Product({
    id:id,
    name:name,
    description:description,
    price:price,
    category:category,
    image:image,
    company:company,
    colors:colors,
    featured:featured
  })
  try {
    await food.save();
    res.json({success:true,message:"Product Added"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }

}

const listProduct = async (req, res) =>{
  try {
    const products = await Product.find({});
    res.json({success:true,data:products})
  } catch (error) {
    console.log(error)
    res.json({success:false, message:"Error"})
  }
}

const removeProduct = async (req, res) =>{
  try {
    const food = await Product.findById(req.body.id);
    fs.unlink(`upload/${food.image}`, ()=>{})

    await Product.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Food Removed"})
  } catch (error) {
    
    res.json({success:false,message:"Error"})
  }
}

export {addProduct, listProduct, removeProduct}
