const userModal = require("../Modals/userModal");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        const findEmail = await userModal.find({email:req.body.email});
        if(findEmail.length != 0){
            res.status(404).json({ message: 'User alredy exists'});
        }
        else{
            let tempPass = req.body.password;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(tempPass, salt);

            const user = new userModal({...req.body,password:hash});

            user.save();

            const token = jwt.sign({ id: user._id }, `${process.env.PRIVITE_KEY}`);
            res.status(201).json({ message: 'User created successfully', user: user , token:token});
        }
    } catch(error) {
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
        const findEmail = await userModal.find({email:req.body.email});
        if(findEmail.length == 0){
            res.status(404).json({ message: 'User not exists'});
        }
        else{
            const result = await bcrypt.compare(req.body.password, findEmail[0].password);
            if(result){
                const token = jwt.sign({ id: findEmail._id }, `${process.env.PRIVITE_KEY}`);
                res.status(201).json({ message: 'User signUP successfully', token:token});
            }
            else{
                res.status(404).json({ message: 'Incorrect Password'});
            }
        }
    } 
    catch(error) {
        res.status(500).json({ message: 'Error finding user', error: error.message });
    };
};

module.exports = {createUser,signUpUser};