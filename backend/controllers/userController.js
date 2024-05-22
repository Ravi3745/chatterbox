const asyncHandler = require('express-async-handler');
const {User} = require("../models/userSchema");
const generateToken = require('../config/generateToken');
const bcryptjs = require('bcryptjs');
// contoller to resiter the user
const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password,pic}= req.body;

    if(!name || !email || !password ){
        res.status(400);
        throw new Error("please enter all details");
    }

    // check if user already exists is yes throw exception
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }
    // crypting password
    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password,salt);


    // creating new user
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        pic
    });

    // user is send to front end with a token
    
    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic: user.pic,
            token:generateToken(user._id)
        })
    }else{
        throw new Error("fail to create user");
    }

});


const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        throw new Error("user not found please sign in");
        
    }
    const validPassword = await bcryptjs.compare(password,user.password);

    if(validPassword){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email
        });
    }
})


module.exports = {registerUser,authUser};