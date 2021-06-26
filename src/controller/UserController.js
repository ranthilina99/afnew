const UserSchema =require('../schemas/Users');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const {validationResult} = require("express-validator");

const addUsers= async (req, res) => {
    try {
        let { user_name, user_email, user_telephone, user_address, user_password } = req.body;
        let user = await UserSchema.findOne({ user_email });
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(401).json({errors: errors.array()});
        }

        if(user){
            return res.status(401).json({alert: "There is a already user who uses this email"})//msg tibbe alert kala
        }

        const salt = await bcrypt.genSalt(12);
        const HashPassword = await bcrypt.hash(user_password,salt);

        user = new UserSchema({
            user_name,
            user_email,
            user_telephone,
            user_address,
            user_password:HashPassword
        });

        await  user.save();

        const payload = {
            admin_user: {
                id: user.id
            }
        }

        const token = ActivationToken(payload);
        res.json({token:token});

    }catch (e) {
        console.log(e.message);
        return res.status(500).json({msg:"server Error..."});
    }
}

const loginUser = async (req, res)=>{
    try{
        const {user_email,user_password} =req.body;

        if(!user_email || !user_password){
            return  res.status(400).json({errormessage:"please enter all required fields"});
        }

        const user =await UserSchema.findOne({user_email});
        if(!user){
            return res.status(400).json({errormessage:"already use the email"});
        }

        const passwordMatch = await bcrypt.compare(user_password, user.user_password);


        if(passwordMatch){

            const payload = {
                user: {
                    id: user.id
                }
            };
            const token = ActivationToken(payload);
            res.json({token:token});

        } else return res.status(401).json({msg:"Password is not Matching "})
    }catch (e){
        console.log(e.message);
        return res.status(500).json({alert:"server Error"});
    }
}
const getSpecificUser = async (req,res) =>{
    try {
        const user = await UserSchema.findById(req.user.id).select('-user_password')

        res.json(user)
    }catch (e) {
        console.log(e.message);
        return res.status(500).json({alert:"server Error"});
    }
}
const ActivationToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}
module.exports = {
    addUsers,
    loginUser,
    getSpecificUser
}
