const url = process.env.MONGODB_URL
import mongoose from "mongoose"
const connectDB= async()=>{ 
    try{ 
        const connect = await mongoose.connect(url)
        if(connect)
        { 
            console.log("Mongodb connected") 
        }

    }
    catch(err)
    { 
        console.log("DB connection error",err)

    }
}
export default connectDB