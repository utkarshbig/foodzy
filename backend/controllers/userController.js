import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(!user)
        {
            return res.json({
                success:false,
                message:"User does not exist"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            return res.json({
                success:false,
                message:"Password does not match"
            })
        }
        const token=createToken(user._id);
        res.json({
            success:true,
            token
        })
    }catch(e)
    {
        console.log(e);
        res.json({
            success:false,
            message:"Error while login"

        })
    }
}
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const registerUser=async(req,res)=>{
    const {name,password,email}=req.body;
try{
    const exists=await userModel.findOne({email});
    if(exists)
    {
        return res.json({success:false,message:"User already exists"})
    }
    if(!validator.isEmail(email))
    {
        return res.json({
            success:false,
            message:"Please enter the valid email"
        })
    }
    if(password.length<8)
    {
        return res.json({
            success:false,
            message:"Please enter the strong a password"
        })
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=userModel({
        name:name,
        email:email,
        password:hashedPassword
    })
    const user=await newUser.save();
    const token=createToken(user._id)
    res.json({
        success:true,
        token
    })
    
}catch(e)
{
    console.log(e);
    res.json({
        success:true,
        message:"Error while registering"
    })
}
}

export {loginUser,registerUser}