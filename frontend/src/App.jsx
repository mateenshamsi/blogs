import { useState } from "react";
import {Router,Routes,Route} from 'react-router-dom'
import { UserContext } from "./context/UserContext";
import { UserContextProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import GetPost from "./pages/GetPost";
import Index from "./pages/Index";
import Layout from "./Layout";
import toast, { Toaster } from 'react-hot-toast';
function App() {
  
  return (
   <UserContextProvider> 
      <Toaster position="top-right"/>
      <Routes> 
        <Route path="/" element={<Layout/>}> 
          <Route path="" element={<Index/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/create-posts" element={<CreatePost/>}/>  
          <Route path="/post/:id" element={<GetPost/>}/>  
          <Route path="/post/:id/edit" element={<EditPost/>} />
        </Route>
      </Routes>
   </UserContextProvider>
  )
}

export default App
