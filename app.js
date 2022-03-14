const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const productRouter = require("./controller/product")
const app = express()

mongoose.connect("mongodb+srv://product:123api@cluster0.wjab4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlparser:true
}).then(() =>{
    console.log("database connected sucessfully")
}).catch((err) =>{
    console.log("error "  +err)
})
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())


app.use("/product", productRouter)
app.listen(8000,(req,res) =>{
    console.log("server.......")
})
