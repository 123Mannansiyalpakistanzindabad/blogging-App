require("dotenv").config()
const express = require("express")
const path = require('path')
const cookieParser = require("cookie-parser")
const app = express()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("mongodb connected")})
app.set("view engine","ejs")
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const blogModel = require("./models/blog")

const checkForAuthenticationCookie = require("./middlewares/authentication")
app.set("viewssss",path.resolve('./views'))
 
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))
app.get('/',async(req,res)=>{
  const allDbBlogs =await blogModel.find({})
  console.log('user',req.user)
  res.render("home",{
    user : req.user,
    blogs : allDbBlogs
  })
})
app.use("/user",userRoute)
app.use("/blog",blogRoute)


 const port = process.env.PORT || 8000
 app.listen(port,()=>{console.log(`app is running on port : ${port}`)})