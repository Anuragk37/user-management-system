import React from 'react'
import UserHeader from '../../Components/Users/UserHeader'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import UsersList from '../../Components/Users/UsersList';

const UserHome = () => {
  const [user,setUser]= useState('')
  const accessToken=useSelector((state)=>state.auth.userAccess)

  useEffect(()=>{
    const getUser = async()=>{
      try{
        const token=jwtDecode(accessToken)
        const response= await axios.get(`http://127.0.0.1:9000/account/users/${token.user_id}`)
        console.log(response.data.username)
        setUser(response.data.username)
      }catch(error){
        console.error(error)
      }
    }
    getUser()
  })

  return (
    <div className='bg-slate-100 h-screen'>
      <UserHeader />
      <div className='flex justify-center items-center '>
        <h1 className='text-7xl mt-44 text-cyan-950 font-semibold'>Wellcome {user}</h1>
      </div>
      <UsersList />
    </div>
  )
}

export default UserHome
