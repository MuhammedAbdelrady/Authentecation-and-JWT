// Here we need to make our user schema
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        max:255,
        min:2
    },
    password:{
        type:String,
        required:true,
        max:1024,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User',userSchema)
//but we need to know that we will import this schema into route file not into app.js