const req = require("express/lib/request")
const mongoose = require("mongoose")

const ProductSchema =mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        unique:true,
        minlenght:2,
        maxlength:30,
        required:true,
        validate(value){
            if(value <= 1 && value >= 30){
                throw new Error("please Enter the validte name")
            }
        }
    },
    price:{
        type:Number,
        minlenght:1,
        maxlength:5,
        required:true
    }
})
module.exports = mongoose.model("Product", ProductSchema)