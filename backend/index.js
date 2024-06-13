import mongoose from "mongoose"
import express from 'express'
import cookieParser from "cookie-parser"
 import postRoute from './routers/postRoute.js'
 import cors from 'cors' 
 
const app = express() 

import authRoute from './routers/authRoute.js'
app.use(express.json()) 
app.use(cookieParser())
import 'dotenv/config.js' 
const port= process.env.PORT || 3000 
import connectDB from "./dbConnect.js"
connectDB() 
app.use(cors({
    origin: process.env.FRONTEND_URL||"https://blogs-pv3r.vercel.app/"||"localhost:5173",
    methods:['GET','POST'] 
  }));
app.use('/api/v1/auth',authRoute)
app.use('/api/v1',postRoute)
app.get('/',(req,res)=>{ 
  res.send("Hello")
})

app.listen(port,()=>{ 
    console.log("Listening on port 3000") 
})