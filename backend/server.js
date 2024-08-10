import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"

const app=express()
const port=4000

app.use(express.json())
app.use(cors())

connectDB();

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("API Working")
})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})
// mongodb+srv://foodzy:63932660@cluster0.q93uj.mongodb.net/?