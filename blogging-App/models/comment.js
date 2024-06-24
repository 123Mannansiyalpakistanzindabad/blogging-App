const {Schema,model} = require("mongoose")
const cmntSchema = new Schema({
content : {
type : String,
required : true
},
blogId : {
type : Schema.Types.ObjectId,
ref  : "blog"
},
createdBy:{
    type : Schema.Types.ObjectId,
    ref : "youtubeUser"
}
},{timestamps : true})
const Comment = model("comment",cmntSchema)
module.exports = Comment