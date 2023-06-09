// const userModal = require("../Modals/userModal");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { User } = require('../Modals/userModal')

require('dotenv').config();

const createUser = async (req, res) => {
    // URL: http://localhost:5000/api/user/createUser

//     sampleData: {
//   "userName":"test3",
//   "email":"test3@gmail.com",
//   "password":"test1234",
//   "admin": "false"
// }
    try {
        const findEmail = await User.find({email:req.body.email});
        if(findEmail.length != 0){
            res.status(404).json({ message: 'User alredy exists'});
        }
        else {
            let tempPass = req.body.password;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(tempPass, salt);

            const user = new User({...req.body,password:hash});

            user.save();

            const token = jwt.sign({ id: user._id }, `${process.env.PRIVITE_KEY}`);
            res.status(201).json({ message: 'User created successfully', user: user , token:token});
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating user', error: error.message });
    };
};

const signUpUser = async (req, res) => {
    // URL: http://localhost:5000/api/user/signUpUser
    // SampleData: {
    //     "email":"test3@gmail.com",
    //     "password":"test1234"
    //   }
    try {
        const findEmail = await User.find({email:req.body.email});
        const error = validate(req.body);
        if (error) {
            res.status(404).json({ message: error.details[0].message});
        }
        if(findEmail.length == 0){
            res.status(404).json({ message: 'User not exists'});
        }
        else{
            const result = await bcrypt.compare(req.body.password, findEmail[0].password);
            if(result){
                const token = jwt.sign({ id: findEmail._id }, `${process.env.PRIVITE_KEY}`, {expiresIn: "7d"});
                // const token2 = User.generateAuthToken();
                res.status(201).json({ message: 'User login successfull', token:token});
            }
            else{
                res.status(404).json({ message: 'Incorrect Email or Password'});
            }
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error finding user', error: error.message });
    };
};

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
};

module.exports = {createUser,signUpUser};