import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import ActionAreaCard from '../components/Card';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://blogs-three-iota.vercel.app/api/v1/posts');
        setPosts(response.data.posts); // Assuming the response structure
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-4xl mb-8">Posts</h1>
      <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map(post => (
            <ActionAreaCard key={post._id} link={post._id} title={post.title} description={post.description} image={post.imageUrl}/>
          ))
        )}
      </div>
    </div>
  );
}
