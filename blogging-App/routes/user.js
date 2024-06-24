const {Router} = require("express")
const router = Router()

const User = require('../models/user')
router.get("/signin",(req,res)=>{
   return res.render("signin")
})
router.get("/signup",(req,res)=>{
  return  res.render("signup")
})
router.post("/signin",async(req,res)=>{
  const {email,password} = req.body
  try{
   const token = await User.matchpasswordAndGenerateToken(email,password)
   
   return res.cookie("token",token).redirect("/")
  } catch(error) {
      return res.render("signin",{
        error : "incorrect email or password"
      })
  }

 })

 router.get("/logout", async(req,res)=>{
  return  await res.clearCookie("token").redirect("/")
 })

router.post("/signup",async(req,res)=>{
    const {fullName,email,password} = req.body
   await User.create({
    fullName,
    email,
    password
   })
   return res.redirect("/")
})
module.exports = router