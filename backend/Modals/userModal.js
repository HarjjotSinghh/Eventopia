const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
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

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.PRIVATE_KEY, {expiresIn: "7d"});
    return token;
}

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        userName: Joi.string().required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().requireed().label("Password")
    })
    return schema.validate(data);
}

const User = mongoose.model("User", userSchema);

module.exports = {User, validate};