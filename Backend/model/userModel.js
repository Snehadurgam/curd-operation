
const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    name : {
        type:String,
        required:true,
    },
    email : {
        type:String,
        unique:true,// if email reapets show error
        required:true,
    },
    age : {
        type:Number,
    },
},{timestamps: true});

//creat model
const User = mongoose.model('User',userSchema);

module.exports = User;