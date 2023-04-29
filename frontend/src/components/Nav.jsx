import React from 'react'
import { FiLogOut } from 'react-icons/fi'

const Nav = ({ setToken }) => {

    const logoutHandler = (e)=>{
        e.preventDefault();
        localStorage.removeItem('token')
        setToken(null)
    }


  return (
    <header className='flex flex-row justify-between items-center h-14 shadow-md shadow-slate-500 mb-4 bg-cyan-100'>
      <div className='ml-4 font-oswald text-xl border-2 border-black rounded-md p-2 m-2'>TaskMaster</div>

        <div>
            <button className='bg-red-300 border-2 border-black rounded-xl p-2 w-10 mr-4 cursor-pointer' onClick={logoutHandler}><FiLogOut/></button>
        </div>
    </header>
  )
}

export default Nav
