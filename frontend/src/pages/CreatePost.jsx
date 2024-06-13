import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';
import toast from 'react-hot-toast'
function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!title || !description || !content || !image) {
      toast.error("Please fill all fields") 
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('content', content);
      formData.append('image', image);

      const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/posts`, formData);
      console.log(result)
      if(result)
        { 
          toast.success("Successfully created post")
         return  <Navigate to="/"/>
        }
      
    } catch (error) {
      toast.error("Error creating post") 
      console.error('Error creating post:', error);
    }
  };
 
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

   
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  return (
    <div className="flex justify-center mt-8">
      <form onSubmit={handleSubmit} className="max-w-lg px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl text-bold mb-2 text-center">Create Posts</h1>

        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
          <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter content" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        {previewImage && (
          <div className="mb-4">
            <img src={previewImage} alt="Preview" className="max-w-xs mx-auto" />
          </div>
        )}

        <div className="flex items-center justify-center">
          <button type="submit" className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Post</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostForm;
