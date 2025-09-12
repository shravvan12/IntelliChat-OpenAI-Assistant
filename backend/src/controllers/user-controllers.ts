import { NextFunction, Request, Response } from "express";
import User from "../models/User.js"
import {hash,compare} from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    //get all users from database
    try {
        const users = await User.find();
        return res.status(200).json({message :"OK" , users});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message :"Errors" , cause: error.message});
        
    }
};

export const userSignup = async (
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    //signup an user
    try {
        const { name , email , password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(401).send("User already registered");
        const hashedPassword = await hash(password , 10);
        const user = new User({name , email , password : hashedPassword });
        await user.save();
        //create token and store cookie
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true ,
            signed:true,
            path :"/",
        });

        const token = createToken(user._id.toString() , user.email);
        const expires = new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{
            path:"/", 
            expires,
            httpOnly:true,
            signed: true
        });

        return res.status(201).json({message:"ok", name: user.name, email: user.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message :"Errors" , cause: error.message});
        
    };
};
export const userLogin = async (
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    //Login an user
    try {
        const { email , password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send("user not registered");
        }
        const isPasswordCorrect= await compare(password , user.password);
        if(!isPasswordCorrect){
            return res.status(401).send("Incorrect Password");
        }

        res.clearCookie(COOKIE_NAME,{
            httpOnly:true ,
            domain:"localhost" , 
            signed:true,
            path :"/",
        });

        const token = createToken(user._id.toString() , user.email);
        const expires = new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{
            path:"/", 
            expires,
            httpOnly:true,
            signed: true});

        return res.status(201).json({message:"ok", name: user.name, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({message :"Errors" , cause: error.message});
        
    };
};

export const VerifyUser = async (
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    //Login an user
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("user not registered or token Malfunctioned");
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permission Denied");
        }
        return res.status(200).json({message:"ok", name: user.name, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({message :"Errors" , cause: error.message});   
    };
};

export const userLogout = async (
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    //Login an user
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("user not registered or token Malfunctioned");
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permission Denied");
        }
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true ,
            signed:true,
            path :"/",
        });
        return res.status(200).json({message:"ok", name: user.name, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({message :"Errors" , cause: error.message});   
    };
};