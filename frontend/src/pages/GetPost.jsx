import React, { useContext, useEffect, useState } from 'react';
  import { UserContext } from '../context/UserContext';
  import axios from 'axios';
  import { useParams, Link, Navigate } from 'react-router-dom';
  
  function GetPost() {
    const { userInfo } = useContext(UserContext);
    const [postData, setPostData] = useState({});
    const { id } = useParams();
    const [redirect, setRedirect] = useState(false);
  
    const handleDelete = async () => {
      try {
        const result = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${id}/delete`);
        if (result.status === 200) {
          toast.success("Successfully deleted post")
          setRedirect(true);
        }
      } catch (err) {
        toast.error("Error deleting post")

        console.error('Error deleting post:', err);
      }
    };
  
    useEffect(() => {
      const getPost = async () => {
        try {
          const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${id}`);
          setPostData(result.data.post);
        } catch (error) {
          console.error('Error fetching the post:', error);
        }
      };
      getPost();
    }, [id]);
  
    if (redirect) {
      return <Navigate to="/" />;
    }
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="border p-6 rounded-lg shadow-lg bg-gray-100 max-w-2xl">
          <div className='w-full'>
            {postData.imageUrl && (
              <img src={postData.imageUrl} alt="Post" className="w-full h-[300px] rounded-md mb-4 object-cover" />
            )}
          </div>
          <div className="text-gray-700 mb-4">
            <p>{postData.content}</p>
            <p><strong>Author:</strong> {postData?.author?.username}</p>
          </div>
          {userInfo?.user?.name === postData?.author?.username && (
            <div className="flex space-x-4 justify-end">
              <Link to={`/post/${id}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Edit
              </Link>
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default GetPost;
  