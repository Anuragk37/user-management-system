import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { jwtDecode } from "jwt-decode";

const EditProfile = () => {
   const[first_name,setFirstName]=useState('')
   const[last_name,setLastName]=useState('')
   const[username,setUsername]=useState('')
   const[email,setEmail]=useState('')
   const[image,setImage]=useState(null)
   const[imageUrl,setImageUrl]=useState(null)
   const[id,setUserId]=useState(null)

   const accessToken = useSelector((state)=>state.auth.userAccess)

   const navigate = useNavigate()

   useEffect(()=>{
      const getUsers = async ()=>{
         try{
            const token = jwtDecode(accessToken)
            setUserId(token.user_id)
            const response =  await axios.get(`http://127.0.0.1:9000/account/users/${id}`)
            setFirstName(response.data.first_name)
            setLastName(response.data.last_name)
            setUsername(response.data.username)
            setEmail(response.data.email)
            setImageUrl(response.data.profile_pic)
         }catch(error){
            console.log(error)
         }
      }
      getUsers()
   },[accessToken,id])

   const handleProfilePictureChange = (e) => {
      const file = e.target.files[0];
      setImage(file)
      if (file) {
          const reader = new FileReader()
          reader.onload = () => {
            setImageUrl(reader.result)
          }
          reader.readAsDataURL(file)
        }
  };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {

         const formDataToSend = new FormData();
         
         // Append form fields to the FormData object
         formDataToSend.append('first_name', first_name);
         formDataToSend.append('last_name',last_name);
         formDataToSend.append('username', username);
         formDataToSend.append('email',email);

         // Append the profile picture if selected
         if (image) {
            formDataToSend.append('profile_pic', image);
         }
         
         const response = await axios.patch(`http://127.0.0.1:9000/account/users/${id}/`, formDataToSend);
         console.log(typeof(response.data.access));
         navigate('/user-profile');
      } catch (error) {
         console.log(error);
      }
   }
   
  return (
   <div className="flex justify-center items-center h-screen py-10">
      <div className="w-4/12 mt-5 border bg-blue-950 p-8 rounded-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-white mb-8 "> Edit User</h2>
      </div>
      <form onSubmit={handleSubmit}>
         <div className="mb-4">
            <label htmlFor="first_name" className="text-white mb-1 inline-block">First Name</label>
            <input type="text" id="first_name" name="first_name" value={first_name} onChange={(e)=>setFirstName(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
         </div>
         <div className="mb-4">
            <label htmlFor="last_name" className="text-white mb-1 inline-block">Last Name</label>
            <input type="text" id="last_name" name="last_name" value={last_name} onChange={(e)=>setLastName(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
         </div>
         <div className="mb-4">
            <label htmlFor="username" className="text-white mb-1 inline-block">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
         </div>
         <div className="mb-4">
            <label htmlFor="email" className="text-white mb-1 inline-block">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
         </div>
         <div className="mb-6">
            <label htmlFor="profile_pic" className="text-white mb-1 inline-block">Upload Profile Picture</label>
            {imageUrl ? (
                                    <img src={imageUrl} alt="Profile" className="w-16 h-16 object-cover rounded-full mr-2" />
                                ) : (
                                    <label htmlFor="profilePicture" className="cursor-pointer flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 placeholder-gray-400 focus:ring focus:ring-opacity-50">
                                        No Profile Image
                                    </label>
                                )}
            <label htmlFor="file-upload" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 border border-gray-400 rounded cursor-pointer">
            Choose File
            </label>
            <input id="file-upload" type="file" onChange={handleProfilePictureChange} className="hidden" />

         </div>
         <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </form>
      </div>
   </div>
  )
}

export default EditProfile
