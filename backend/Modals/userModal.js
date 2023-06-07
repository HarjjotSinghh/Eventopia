const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    admin: {
        type: Boolean,
        required:false,
        default: false
    }
},{ timestamps: true });

module.exports = mongoose.model("User",userSchema);