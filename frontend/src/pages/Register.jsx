import React, { useState ,useContext} from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { Navigate } from 'react-router'

function Register() {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {userInfo,setUserInfo}=useContext(UserContext) 
  const [redirect,setRedirect] = useState(false)
  const handleRegister = async(e)=>{
    e.preventDefault() 
    try{ 
        const result = await axios.post('/api/v1/auth/signup',{username,email,password}) 
        if(result)
        {
          const data=result.data
          if(data)
            { 
              setUserInfo(data)
              toast.success("Signed Up successfully")
              setRedirect(true)
            }
        }
        else{
          toast.error("Error signing up")
          console.log("Cannot register user") 
        }
    }
    catch(err)
    { 
      console.log(err)
    }
  } 
  if(redirect)
    { 
      return <Navigate to="/"/> 
    }
  return(
  <div className=' mb-[190px] flex flex-col h-screen justify-center items-center '>
      <h1 className="text-4xl font-bold mb-12">Register</h1>
      <form className="mb-6" onSubmit={handleRegister} > 
      <label htmlFor='username' className='block mb-2 text-2xl'>
          Username
        </label> 
        <input type='text' id='username' name="username"  className="outline-none mb-4 w-full rounded-lg" value={username} onChange={(e)=>setUsername(e.target.value)}/>

        <label htmlFor='email' className='block mb-2 text-2xl'>
          Email  
        </label> 
        <input type='text' id='email' name="email"  className="outline-none mb-4 w-full rounded-lg" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor='password' className='block mb-2 text-2xl'>
          Password
        </label> 
        <input type='password' id='password' name="password"  className="outline-none mb-2 w-full rounded-lg" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <div className='flex justify-center mt-4'>
        <button className="bg-gray-400 rounded-lg w-full px-4 py-2">Register</button>
        </div>
        
      </form>
    </div>
  ) 
}

export default Register
