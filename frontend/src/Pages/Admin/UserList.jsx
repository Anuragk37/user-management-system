import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/Admin/AdminHeader'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const UserList = () => {
   const [users,setUsers] = useState([])
   const [search,setSearch] = useState("")
   const navigate = useNavigate()
   console.log(search)

   useEffect(()=>{
      getUsers()
   },[])

   const getUsers = async ()=>{
      try{
         const response =  await axios.get("http://127.0.0.1:9000/account/users/")
         setUsers(response.data)
      }catch(error){
         console.log(error)
      }
   }

   const handleDelete = async(id)=>{
      try{
         console.log("clicekd")
         await axios.delete(`http://127.0.0.1:9000/account/users/${id}`)
         getUsers()
      }catch(error){
         console.log(error)
      }
   }
  return (
   <div className="container mx-auto">
      <AdminHeader fromUserList={true}/>
      <div className='my-9 min-w-max flex justify-between items-center w-9/12 mx-auto'>
         <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
            <input
            type="text"
            placeholder="Search..."
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={(e)=>setSearch(e.target.value)}
            />
         </div>
         <div></div> {/* Placeholder for left side */}
         <div className="flex items-center"> {/* Container for link */}
            <Link to={'/create-user'} className='bg-cyan-950 text-white p-2 rounded-2xl'> Create user</Link>
         </div>
      </div>
      <div className="bg-white shadow-md rounded my-9 w-9/12 mx-auto">
         
         <table className="min-w-max w-full table-auto my-7">
            <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                     <th className="py-3 px-6 text-left">First Name</th>
                     <th className="py-3 px-6 text-left">Last Name</th>
                     <th className="py-3 px-6 text-left">Username</th>
                     <th className="py-3 px-6 text-left">Email</th>
                     <th className="py-3 px-6 text-left">Action</th>
                  </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                  {users.filter((item)=>{
                     return search.toLowerCase ==='' ? item :item.first_name.toLowerCase().includes(search)
                  }).map((user, index) => (
                     user.first_name ? (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                              <td className="py-3 px-6 text-left font-semibold">{user.first_name}</td>
                              <td className="py-3 px-6 text-left font-semibold">{user.last_name}</td>
                              <td className="py-3 px-6 text-left font-semibold">{user.username}</td>
                              <td className="py-3 px-6 text-left font-semibold">{user.email}</td>
                              <td>
                                 <button onClick={() => handleDelete(user.id)} className='bg-sky-900 text-white p-2 rounded-lg mr-2'>delete</button>
                                 <button onClick={() => navigate(`/edit-user/${user.id}`)} className='bg-sky-900 text-white p-2 rounded-lg'>edit</button>
                              </td>
                        </tr>
                     ) : null
                  ))}
            </tbody>
         </table>
      </div>


   </div>
  )
}

export default UserList
