import mongoose from "mongoose";
import Post from "../models/postModel.js";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const accessKey = process.env.ACCESS_KEY;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});
export const createPosts = async(req,res)=>{ 
  try{ 
    const {title,content,description} = req.body 
    if(!title||!content||!description) 
      { 
        return res.status(400).json({success:false,message:"Title and content required"})
      }
      if(!req.file)
      { 
        return res.status(400).json({success:false,message:"Image file required"})
      }
      const uniqueKey = `${uuidv4()}-${req.file.originalname}`
      const buffer = await sharp(req.file.buffer).resize({height:450,width:800,fit:"contain"}).toBuffer() 
      const params = { 
        Bucket:bucketName , 
        Key:uniqueKey,
        Body:buffer, 
        ContentType:req.file.mimetype 
      }
      const command = new PutObjectCommand(params) 
      await s3.send(command) 
    
      const newPost = new Post({ 
        title,
        content, 
        description, 
        image:uniqueKey ,
        author:req.user._id
      })
      const savedPost =  await newPost.save() 
      res.status(200).json({success:true,message:"Post created",savedPost})
    }
  catch(err)
  { 
    res.status(400).json({success:false,message:"Cannot get posts"})
  }
}
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 });

       const postsWithUrls = await Promise.all(posts.map(async (post) => {
      if (post.image) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: post.image,
        };

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        
               return {
          ...post.toObject(), 
          imageUrl: url,
        };
      }

      return post.toObject(); 
    }));

    res.json({ success: true, posts: postsWithUrls });
  } catch (err) {
    res.status(400).json({ success: false, message: "Cannot get posts", error: err.message });
  }
};



export const getPost = async(req,res)=>{ 
    try{ 
        const {id} = req.params 
        const post = await Post.findById(id).populate('author',['username']) 
        const params = { 
         Bucket:bucketName,
          Key:post.image
         } 
         const command = new GetObjectCommand(params) 
         const imageUrl = await getSignedUrl(s3,command)
        
        const postWithUrl = {
          ...post.toObject(), 
          imageUrl,
        };
    
        res.json({ success: true, post: postWithUrl });

    }
    catch(err){ 
        res.status(400).json({ success: false, message: "Cannot get post", err });

    }
}
export const editPost = async(req,res)=>{ 
    try {
        const { id } = req.params;
        const { title, content,description } = req.body;
        const updateData = { title, content,description };
        if(req.file)
        {   const uniqueKey = `${uuidv4()}-${req.file.originalname}`
        const buffer = await sharp(req.file.buffer).resize({height:450,width:800,fit:"contain"}).toBuffer() 
        const params ={ 
         Bucket:bucketName, 
         Key:uniqueKey, 
         Body:buffer,
         ContentType:req.file.mimeType 
        }
        const command = new PutObjectCommand(params) 
        await s3.send(command) 
        updateData.image = uniqueKey  
        }
       
      
        const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedPost) {
            return res.status(400).json({ success: false, message: "Cannot update post" });
        }

        return res.status(200).json({ success: true, message: "Updated post successfully", updatedPost });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Cannot update post" });
    }
}
export const deletePost = async(req,res)=>{ 
    try{ 
    const {id}  = req.params
    const post = await Post.findById(id) 
    const params ={ 
      Bucket : bucketName , 
      Key: post.image 
    }
    const command = new DeleteObjectCommand(params) 
    await s3.send(command) 
    const deletedPost = await Post.findByIdAndDelete(id) 
    if(!deletedPost)
        { 
            return res.status(400).json({message:"Cannot delete post"})
        }
        return res.status(200).json({message:"Deleted post successfully"})
      
    } 
    catch(err)
    {   
        console.log(err)
        return res.status(400).json({message:"Error deleting post",err})

    }

}