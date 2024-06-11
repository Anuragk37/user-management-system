import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

const UsersList = () => {
  const [users,setUsers]=useState([])
  const accessToken=useSelector((state)=>state.auth.userAccess)

  useEffect(()=>{
    getUsers()
  },[])
  const getUsers = async()=>{
    try{
      const response = await axios.get("http://127.0.0.1:9000/account/users/")
      setUsers(response.data)
    }catch(error){
      console.log(error)
    }
  }
  const handleFollow = async(id)=>{
    try{
      const token = jwtDecode(accessToken)
      const data={
        follower:token.user_id,
        following:id
      }
      const resposne = await axios.post("http://127.0.0.1:9000/account/connectivity/",data)
      console.log(resposne)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div>
      <div className='w-60'>
        <h1>User list</h1>
        <table className='w-full '>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.first_name}</td>
            <td><button className='border-2' onClick={()=>{handleFollow(user.id)}}>follow</button></td>
          </tr>
        ))}
        </table>
      </div>
    </div>
  )
}

export default UsersList
