import mongoose from "mongoose";
import env from "../config/env";

export const connecMongodb = async()=>{
    try{
        await mongoose.connect(env.mongo_uri)
        console.log("Mongodb Database connected successfully")
    }catch(err){
        console.log(err)
    }
}