import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userSignout } from '../../features/authSlice'

const UserHeader = () => {
   const dispatch = useDispatch()

   const handleLogout = ()=>{
      console.log("clicked")
      dispatch(userSignout())
   }
  return (
    <div>
      <div className='h-24 bg-sky-950 flex justify-end items-center px-28'>
         <Link to={'/user-profile'} className='text-white text-lg font-semibold'>Profile</Link>
         <button onClick={handleLogout} className='text-white font-semibold ml-3 text-lg' >log out</button>
      </div> 
    </div>
  )
}

export default UserHeader
