import React, { useEffect, useState } from 'react'
import UserHeader from '../../Components/Users/UserHeader'
import { useSelector } from 'react-redux'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserProfile = () => {
   const [user,setUser]=useState({})
   const [followings,setFollowings]=useState([])

   const accessToken = useSelector((state)=>state.auth.userAccess)
   
   useEffect(()=>{
      const getUser = async()=>{
         try{
            const token=jwtDecode(accessToken)
            const resposne= await axios.get(`http://127.0.0.1:9000/account/users/${token.user_id}`)
            setUser(resposne.data)
            
         }catch(error){
            console.error(error)
         }
      }
      const getFollowing = async()=>{
        try{
          const token = jwtDecode(accessToken)
          const resposne= await axios.get(`http://127.0.0.1:9000/account/connectivity/${token.user_id}`)
          setFollowings(resposne.data)
        }catch(error){
          console.log(error)
        }
      }
      getUser()
      getFollowing()
   },[])


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto ">
        <UserHeader />
        <div className="flex flex-wrap justify-center gap-8 mt-36 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
            <div className="flex flex-col items-center">
              <img
                src={user.profile_pic} // Assuming user.profile_pic contains the URL of the profile picture
                alt="Profile"
                className="w-32 h-32 rounded-full shadow-md"
              />
              <h2 className="text-2xl font-semibold mt-4">{user.first_name} {user.last_name}</h2>
              <p className="text-gray-600">@{user.username}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-1">Email:</p>
              <p className="text-lg font-semibold text-gray-800">{user.email}</p>
            </div>
          </div>
        </div>
        <Link to={'/edit-profile'} className='bg-cyan-900 text-white rounded-lg p-2'>edit profile</Link>
      </div>
      <div>
        {followings.map((following)=>(
          <h3>{following.following}</h3>
        ))}
      </div>
    </div>

  )
}

export default UserProfile
