const {Schema,model} = require('mongoose')

const blogSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    coverImageUrl : {
        type : String,
        required : false
    },
    title : {
        type : String,
        required : true
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "youtubeUser"
    }
},{timestamps : true})

const blog = model("blog",blogSchema)
 
module.exports = blog


