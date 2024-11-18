import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id:{
    type:String,
    unique:true,
    required:true
  },
  name:{
    type:String,
    required : true,
  },
  description:{
    type:String,
    required: true
  },
  price:{
    type:Number,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  featured:{
    type:Boolean,
  },
  company:{
    type:String,
    required:true
  },
  colors:{
    type:Array,
    required:true
  },
},{})

export const Product = mongoose.models.product || mongoose.model("Product",productSchema)