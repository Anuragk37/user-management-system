import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminSignout } from '../../features/authSlice'


const AdminHeader = ({fromUserList}) => {
   const dispatch = useDispatch()

   const handleLogout = ()=>{
      console.log("clicked")
      dispatch(adminSignout())
   }
  return (
   <div>
      <div className='h-24 bg-sky-950 flex justify-end items-center px-16'>
         {fromUserList?
         <Link to={'/admin-home'} className='text-white text-lg font-semibold'>Home</Link>:
         <Link to={'/userlist'} className='text-white text-lg font-semibold'>Users</Link>
         }
         <button onClick={handleLogout} className='text-white text-lg ml-5 font-semibold'>log out</button>
      </div> 
   </div>
  )
}

export default AdminHeader
