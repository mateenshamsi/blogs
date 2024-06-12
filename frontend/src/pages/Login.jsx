import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Link, Navigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    console.log("Updated userInfo:", userInfo);
  }, [userInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('/api/v1/auth/login', { email, password });
      const data = result.data;
     
      setUserInfo(data);
      
      if (result.status === 200 && data) {
        toast.success("Sucessfully signed in")
        setRedirect(true);
      } else {
        toast.error("Error signing in")

        
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setMessage("An error occurred during login");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className='mb-[190px] flex flex-col min-h-screen justify-center items-center'>
      <h1 className="text-4xl font-bold mb-12">Login</h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <form className="mb-6" onSubmit={handleLogin}>
        <label htmlFor='email' className='block mb-2 text-2xl'>Email</label>
        <input
          type='email'
          id='email'
          name="email"
          className="outline-none mb-4 w-full rounded-lg px-4 py-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password' className='block mb-2 text-2xl'>Password</label>
        <input
          type='password'
          id='password'
          name="password"
          className="outline-none mb-2 w-full rounded-lg px-4 py-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='flex justify-center mt-4'>
          <button className="bg-gray-400 rounded-lg w-full px-4 py-2">Login</button>
        </div>
        <p className="mt-4 text-gray-600">
        Don't have an account?{' '}
        <Link to="/register " className="text-blue-500 hover:underline">Sign up</Link>
      </p>
      </form>
    </div>
      
   
  );
}

export default Login;
