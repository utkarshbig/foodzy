import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect(write your own mongoDB credetial).then(()=>{
        console.log("DB connected")
    })
}
