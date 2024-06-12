import express from 'express';
import multer from 'multer';
import { isSignedIn,isAuthor } from '../middleware/authMiddleware.js';
import { createPosts,getPost,getPosts,editPost,deletePost } from '../controllers/postController.js';
import {
    S3Client,
    PutObjectCommand,
    CreateBucketCommand,
    DeleteObjectCommand,
    DeleteBucketCommand,
    paginateListObjectsV2,
    GetObjectCommand,
  } from "@aws-sdk/client-s3";
 

const router = express.Router();

const storage = multer.memoryStorage()

const upload = multer({ storage:storage , limits: {
  fileSize: 1024 * 1024 * 5, // limit file size to 5MB
},
fileFilter: (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
},});
router.post('/posts', isSignedIn, upload.single('image'), createPosts);
router.get('/posts',getPosts) 
router.get('/post/:id',getPost) 
router.put('/post/:id/edit',isSignedIn,isAuthor,upload.single('image'),editPost) 
router.delete('/post/:id/delete',isSignedIn,isAuthor,deletePost) 
export default router;

