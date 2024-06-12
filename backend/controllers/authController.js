import User from "../models/userModel.js"
import { comparePassword, hashPassword } from "../utils/authUtils.js"
import jwt from 'jsonwebtoken'
export const registerController = async(req,res)=>{ 
    try{
        const {username,email,password} = req.body 
        if(!username||!email||!password)
            { 
                res.status(400).json({success:false,message:'Pls enter complete details',err})
                
            }
        const existingUser = await User.findOne({$or:[{username},{email}]})
        if(existingUser)
        { 
        res.status(500).json({success:false,message:'User already exists'})

        }
        const hashedPassword = await hashPassword(password) 

        const newUser=await User.create({username,email,password:hashedPassword}) 
        return res.status(200).json({success:true,message:"Registered user"})
    }
    catch(err)
    { 
        console.log(err)
        res.status(400).json({success:false,message:'Cannot register user',err})
    }
}
export const loginController = async(req,res)=>{ 
    const {email,password} = req.body ; 
    if(!email||!password)
    { 
        return res.status(500).json({success:false,message:"Cannot login user"})
    }
    const user = await User.findOne({email}) 
    if(!user)
    { 
        return     res.status(400).json({success:false,message:"cannot sign in user"}) 

    }
    const compare = await comparePassword(password,user.password)
    if(!compare)
    { 
        return     res.status(400).json({success:false,message:"Please enter correct password"})  

    }
    const token =  await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
    res
    .cookie("token", token, {
      httpOnly: false,
      sameSite: "none",
      secure: true,
    })
    return res.status(200).json({success:true,message:"User Logged In successfully",user:{ 
        name:user.username,
        email:user.email ,
     
    },token})
    

}
export const logoutController = async(req,res)=>{ 
    res.cookie('token', '', { maxAge: 0 }); 
    return res.status(200).json({ success: true, message: 'Logged out successfully' });

}
