import React, { useState } from 'react'
import { AdminElection, Election, Home, Login, Navbar, NewElection, Signup } from './components'
import { Route, Routes } from 'react-router-dom'

function App() {

  const [loggedIn,setLoggedIn] = useState(false);
  const [admin,setAdmin] = useState(false);

  return (
    <div className="flex flex-col bg-body justify-between h-screen">
      <div className='flex bg-header text-white p-5'>
        <Navbar loggedIn={loggedIn} admin={admin} setAdmin={setAdmin} setLoggedIn={setLoggedIn}/>
      </div>
      <div className='flex p-5 h-full overflow-auto'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login setLoggedIn={setLoggedIn} setAdmin={setAdmin}/>}/>
          <Route path='/signup' element={<Signup setLoggedIn={setLoggedIn}/>}/>
          <Route path='/admin/election' element={<AdminElection/>}/>
          <Route path='/admin/election/new' element={<NewElection/>}/>
          <Route path='/election' element={<Election/>}/>
        </Routes>
      </div>
      <div className='flex py-2 px-5  justify-center items-center bg-header text-white'>
        <div className='flex justify-center items-center flex-col'>
          <span className='flex'>Blockchain Based Voting System</span>
          <span className='flex'>Copyrights @ 2024</span>
        </div>
      </div>
    </div>
  )
}

export default App
