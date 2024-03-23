import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({setLoggedIn,setAdmin}) => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    console.log(email,password);
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email: email,
        password: password
      });
      console.log('Login successful:', response.data);
      let data = response.data;
      if (data.user.admin){
        setAdmin(true);
      }
      else{
        setAdmin(false);
      }
      localStorage.setItem('user', JSON.stringify(response.data));
      setLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div className='flex justify-center items-center w-full'>
      <div className="flex flex-col justify-center items-center border shadow-xl border-black rounded-2xl p-10 gap-10">
        <div className="flex justify-center text-xl font-bold">Login</div>
        <div className="flex flex-row w-full justify-center">
          <div className="flex w-[40%]">
            <p className="flex font-bold text-lg">Email</p>
          </div>
          <div className="flex w-[60%]">
            <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className="flex w-full border-b-2 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-row w-full justify-center">
          <div className="flex w-[40%]">
            <p className="flex font-bold text-lg">Password</p>
          </div>
          <div className="flex w-[60%]">
            <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} className="flex w-full border-b-2 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center bg-black text-white rounded-2xl px-5 py-2 cursor-pointer hover:scale-105" onClick={handleLogin}>Login</div>
          <div className="flex justify-center px-5 py-2 gap-5 hover:scale-105" onClick={()=>navigate('/signup')}> 
            <span className="flex">New User?</span>
            <span className='flex text-blue-600 underline cursor-pointer'>Signup</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login