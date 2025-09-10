import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi , ChatCompletionRequestMessage} from "openai";

export const generateChatCompletion = async (
    req: Request,
    res : Response,
    next : NextFunction)=>{
        const {message} = req.body;
        try {
            const user = await User.findById(res.locals.jwtData.id) 
        if(!user) return res.status(401).json({message: "User not registered or malfunction"});
        //grab chats of the user
        const chats = user.chats.map(({role,content})=>({role , content})) as ChatCompletionRequestMessage[];
        chats.push({content: message, role: "user"});
        user.chats.push({content: message, role: "user"});
        //send all chats with new one to openai api
        const config= configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        //get latest response
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({
            message: "ok",
            chats : user.chats
        });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Internal Server Error", cause: error.message});
        }
    };

    export const sendChatsToUser = async (
        req : Request,
        res : Response,
        next : NextFunction
    )=>{
        try {
            const user = await User.findById(res.locals.jwtData.id);
            if(!user){
                return res.status(401).send("user not registered or token Malfunctioned");
            }
            console.log(user._id.toString() , res.locals.jwtData.id);
            if(user._id.toString() !== res.locals.jwtData.id){
                return res.status(401).send("Permission Denied");
    
            }
            return res.status(200).json({message:"ok", chats : user.chats });
        } catch (error) {
            console.log(error);
            return res.status(200).json({message :"Errors" , cause: error.message});   
        };
    };

     export const deleteChats = async (
        req : Request,
        res : Response,
        next : NextFunction
    )=>{
        try {
            const user = await User.findById(res.locals.jwtData.id);
            if(!user){
                return res.status(401).send("user not registered or token Malfunctioned");
            }
            console.log(user._id.toString() , res.locals.jwtData.id);
            if(user._id.toString() !== res.locals.jwtData.id){
                return res.status(401).send("Permission Denied");
    
            }
            //@ts-ignore
            user.chats =[];
            await user.save();
            return res.status(200).json({message:"ok"});
        } catch (error) {
            console.log(error);
            return res.status(200).json({message :"Errors" , cause: error.message});   
        };
    };