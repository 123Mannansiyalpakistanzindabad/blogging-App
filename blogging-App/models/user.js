const {Schema,model} = require('mongoose')
const {createHmac,randomBytes} = require("crypto");
const { createTokenForUser } = require('../services/authentication');
const userSchema = new Schema({
  fullName : {
      type : String,
      required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  salt : {
    type : String,
    //  required : true
  },
  profileImageUrl : {
    type : String,
    default : '/images/default.jpg'
  },
  password : {
      type : String,
      required : true
  },
  role : {
    type : String,
    enum  : ["USER", "ADMIN"],
    default : "USER"
  }
},{timestamps : true})

userSchema.pre("save",function(next){
  const user = this;
  if(!user.isModified("password")) return
  const salt = randomBytes(16).toString()
  const HashedPassword = createHmac('sha256',salt).update(user.password).digest("hex")
  this.salt = salt
  this.password = HashedPassword
  next()
})

userSchema.static("matchpasswordAndGenerateToken",async function(email,password){
  const user = await this.findOne({email})
  if(!user)  throw new error('user not found')  
  const salt = user.salt
  const hashPassword = user.password
  const userprovidedHash = createHmac('sha256',salt).update(password).digest("hex")

 if(hashPassword !== userprovidedHash) throw new error("incorrect password")
  const token = createTokenForUser(user)
  return token;
})
  
const User = model("youtubeUser",userSchema)

module.exports = User;