import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { userSignin } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUp = ({fromAdmin}) => {
   const [formData,setFormData] = useState({
      first_name:'',
      last_name:'',
      username:'',
      email:'',
      password:'',
      profile_pic:null
   })
   const [image, setImage] = useState(null);
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');

   const navigate = useNavigate()
   const dispatch=useDispatch()

   // const dispatch=useDispatch()

   const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
      
  };
  console.log(formData)
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {

         formData.profile_pic=image

         const formDataToSend = new FormData();
         
         // Append form fields to the FormData object
         formDataToSend.append('first_name', formData.first_name);
         formDataToSend.append('last_name', formData.last_name);
         formDataToSend.append('username', formData.username);
         formDataToSend.append('email', formData.email);
         formDataToSend.append('password', formData.password);
         
         // Append the profile picture if selected
         if (formData.profile_pic) {
            formDataToSend.append('profile_pic', formData.profile_pic);
         }
         
         const response = await axios.post("http://127.0.0.1:9000/account/signup/", formDataToSend);
         console.log(typeof(response.data.access));
         if(!fromAdmin){
            dispatch(userSignin(response.data));
            navigate('/user-home');
         }else{
            navigate('/userlist');
         }
      } catch (error) {
         console.log(error);
      }
   }


  return (
    <div className="flex justify-center items-center h-screen bg-cyan-50">
  <div className="bg-cyan-950 rounded-lg shadow-lg p-8 w-4/12">
    <h2 className="text-center text-3xl font-bold text-white mb-8">{fromAdmin ? 'Create User' : 'Sign Up'}</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input type="text" id="first_name" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
      </div>
      <div>
        <input type="text" id="last_name" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
      </div>
      <div>
        <input type="text" id="username" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
      </div>
      <div>
        <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
      </div>
      <div>
        <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
      </div>
      <div>
        <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
      </div>
      <div className="relative">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mt-2 text-gray-800 opacity-0 absolute left-0 top-0" />
        <label htmlFor="profile_pic" className="cursor-pointer bg-sky-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Upload Profile Picture</label>
      </div>

      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{fromAdmin ? 'Submit' : 'Sign Up'}</button>
    </form>

    {!fromAdmin && <Link to={'/signin'} className='text-white' >New User ? signin</Link>}
  </div>
</div>



  )
}

export default SignUp