const jwt = require("jsonwebtoken")
const secretkey = "secretMessage"

function createTokenForUser(user){
    const payload = {
        _id : user._id,
        email : user.email,
        fullName : user.fullName,
        profileImageUrl : user.profileImageUrl,
        role  : user.role
    }
    const token = jwt.sign(payload,secretkey)
    return token

}
function validateToken(token){
 const payload = jwt.verify(token,secretkey)
 return payload
}
 
module.exports = {createTokenForUser,validateToken}

