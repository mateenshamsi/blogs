import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';

export const isSignedIn = async (req, res, next) => {
    try {
      
        const token = req.cookies.token
        if(!token)
            { 
                return res.status(400).json({message:"Token Missing" })
            }
        const decode = await jwt.verify(token,process.env.JWT_SECRET) 
        if(!decode)
            { 
                return res.status(400).json({message:"Cannot decode user detaisl"})

            }
        req.user = decode 
        next()

    } 
    catch(err)
    { 
        res.status(400).json({message:"Cannot verify user details"})
    }
}
export const isAuthor= async(req,res,next)=>{ 
 try{ 
        const {id} = req.params 
        const post = await Post.findById(id).populate('author') 
        if(!post)
        { 
            return res.status(404).json({success:false,message:"Cannot find post"})

        }
        if(post.author._id!=req.user._id) 
        { 
            return res.status(400).json({ error: 'You are not authorized to perform this action' })
        }
        next() 
 }  
 catch(err)
 {  console.log(err)
    res.status(500).json({ error: err.message });
 } 
}