const express = require("express");
const  mongoose  = require("mongoose");;
const Product = require("../models/product");
const router = express.Router();

router.get("/", async(req,res) =>{
    const a = await Product.find()
    .exec()
    .then((result) =>{
        console.log("result", JSON.stringify(result))
        res.status(200).json(result)
    }).catch((err) =>{
        console.log("error" +err)
    })
    // res.send(a)
    // res.json(req.body)
    // console.log(a)
})
router.post("/",(req,res) =>{
   try{
    const product = new Product({
        _id:mongoose.Types.ObjectId(),
        name:req.body.name,
        price: req.body.price
    })
    product.save().then(result =>{
        console.log(result)
    }).catch(err =>{
        console.log("error" +err)
    })
    res.status(200).json({
        message:"Handling the post request",
        created: product
    })
    // console.log(req.body)
   }catch(err){
       console.log("error" +err)
   }
})
router.get("/:productId",(req,res) =>{
    const id= req.params.productId
    Product.findById(id)
    .then((result)  =>{
        console.log(result)
        res.status(200).json({
            message:"getting product by id",
            data:result
        })
    }).catch((err) =>{
        console.log("error ", err)
    })
})
router.put("/:productId",(req,res) =>{
    const id = req.params.productId;
    console.log(id)
    const updateProp={}
    for(const ops of req.body){
        updateProp[ops.propName] = ops.value
    }
    Product.update({_id:id},{$set:updateProp})
    .then((result) =>{
        console.log(result)
    }).catch((err) =>[
        console.log("error "+err)
    ])
})
router.delete("/:productId", async (req,res) =>{
    const id = await req.params.productId
    console.log(id)
    await Product.remove({_id:id})
    .then((result) =>{
        console.log("result", result)
        res.send(result)
    }).catch((err)=>{
        console.log("error " +err )
    })
})
module.exports = router