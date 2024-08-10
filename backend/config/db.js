import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://foodzy:63932660@cluster0.q93uj.mongodb.net/foodzy').then(()=>{
        console.log("DB connected")
    })
}