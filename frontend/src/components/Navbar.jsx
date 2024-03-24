import React, { useState } from 'react'
import { navLinks } from '../constants'
import { Link, useNavigate } from 'react-router-dom'
import { menuClose, menuOpen } from '../assets';

const Navbar = ({loggedIn,admin, setLoggedIn, setAdmin}) => {
  const [navToggle,setNavToggle] = useState();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('user'));
  const handleLogOut= () => {
    setAdmin(false);
    setLoggedIn(false);
    navigate("/");
  }


  return (
    <div className='flex justify-between items-center w-full'>
        <div className='flex'>
            <Link to={'/'}><span className='flex text-2xl'>BBVS</span></Link>
        </div>
        <div className='sm:flex hidden'>
          <div className="flex flex-row">
            <Link className='flex text-xl hover:text-primary px-5' to={'/'}>Home</Link>
            {!loggedIn && <Link className='flex text-xl hover:text-primary px-5' to={'/login'}>Login</Link>}
            {loggedIn && admin && <Link className='flex text-xl hover:text-primary px-5' to={'/admin/election'}>Election</Link>}
            {loggedIn && !admin && <Link className='flex text-xl hover:text-primary px-5' to={'/election'}>Vote</Link>}
            {loggedIn && <div className='flex text-xl hover:text-primary px-5 cursor-pointer' onClick={handleLogOut}>Logout</div>}
          </div>
        </div>
        <div className='flex sm:hidden'>
          <span className="text-xl" onClick={()=>{setNavToggle(!navToggle)}}>
            <img className='flex w-10 h-10' src={menuOpen}/>
          </span>

          {navToggle &&
            <div className="flex absolute top-0 right-0 w-[100vh] h-[100vh] z-[100] bg-[#433d3d9c]" onClick={()=>{setNavToggle(!navToggle)}}>
              <div className="flex flex-col absolute h-[100vh] w-[10rem] top-0 right-0 bg-black z-[200] gap-5 p-5 ">
                <div className="flex justify-end text-xl" onClick={()=>{setNavToggle(!navToggle)}}>
                  <img className='flex w-10 h-10' src={menuClose}/>
                </div>
                <Link className='flex text-xl hover:text-primary px-5' to={'/'}>Home</Link>
                {!loggedIn && <Link className='flex text-xl hover:text-primary px-5' to={'/login'}>Login</Link>}
                {loggedIn && admin && <Link className='flex text-xl hover:text-primary px-5' to={'/admin/election'}>Election</Link>}
                {loggedIn && !admin && <Link className='flex text-xl hover:text-primary px-5' to={'/election'}>Vote</Link>}
                {loggedIn && <div className='flex text-xl hover:text-primary px-5' onClick={handleLogOut}>Logout</div>}
              </div>
            </div>
          }
        
        </div>
    </div>
  )
}

export default Navbar