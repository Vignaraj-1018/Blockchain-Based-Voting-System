import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({setLoggedIn}) => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [name,setName] = useState();
    const [phone,setphone] = useState();
  
    const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(email,password);
    try {
      const response = await axios.post(`${import.meta.env.VITE_backend_url}/auth/signup`, {
        email: email,
        password: password,
        name: name,
        citizenshipNumber: phone
      });
      console.log('Signup successful:', response.data);
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
        <div className="flex justify-center text-xl font-bold">Signup</div>
        <div className="flex flex-row w-full justify-center">
          <div className="flex w-[40%]">
            <p className="flex font-bold text-lg">Name</p>
          </div>
          <div className="flex w-[60%]">
            <input type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)} className="flex w-full border-b-2 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-row w-full justify-center">
          <div className="flex w-[40%]">
            <p className="flex font-bold text-lg">Phone</p>
          </div>
          <div className="flex w-[60%]">
            <input type="tel" placeholder='Phone' onChange={(e)=>setphone(e.target.value)} className="flex w-full border-b-2 rounded-lg" />
          </div>
        </div>
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
        <div className="flex justify-center bg-black text-white rounded-2xl px-5 py-2 cursor-pointer hover:scale-105" onClick={handleLogin}>Signup</div>
      </div>
    </div>
  )
}

export default Signup