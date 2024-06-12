import mongoose from "mongoose"
import express from 'express'
import cookieParser from "cookie-parser"
 import postRoute from './routers/postRoute.js'
 import cors from 'cors' 
const app = express() 
import 'dotenv/config'
import authRoute from './routers/authRoute.js'
app.use(express.json()) 
app.use(cookieParser())
import 'dotenv/config.js' 
import connectDB from "./dbConnect.js"
connectDB() 
app.use(cors({
    origin: 'http://localhost:5173'
  }));
app.use('/api/v1/auth',authRoute)
app.use('/api/v1',postRoute)


app.listen(3000,()=>{ 
    console.log("Listening on port 3000") 
})