import React from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { userSignin } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

const SignUp = ({fromAdmin}) => {
   const [image, setImage] = useState(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const[imageUrl,setImageUrl]=useState(null)


   const schema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
    confirm_password : yup.string().oneOf([yup.ref("password"),null]).required(),
   })

   const { register, handleSubmit, formState: { errors } } = useForm({
    resolver:yupResolver(schema)
   });

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
   

   const onSubmit = async (data) => {
    try {
        console.log(data.first_name);
        const formDataToSend = new FormData();

        
        formDataToSend.append('first_name', data.first_name);
        formDataToSend.append('last_name', data.last_name);
        formDataToSend.append('username', data.username);
        formDataToSend.append('email', data.email);
        formDataToSend.append('password', data.password);
        
        if (image) {
            console.log("somthing")
            formDataToSend.append('profile_pic', image);
        }


        const response = await axios.post("http://127.0.0.1:9000/account/signup/", formDataToSend);
        console.log(typeof(response.data.access));
        if (!fromAdmin) {
            dispatch(userSignin(response.data));
            navigate('/user-home');
        } else {
            navigate('/userlist');
        }
    } catch (error) {
        console.log(error);
    }
};




   return (
    <div className="flex justify-center items-center h-screen bg-cyan-50">
      <div className="bg-cyan-950 rounded-lg shadow-lg p-8 w-4/12">
        <h2 className="text-center text-3xl font-bold text-white mb-8">{fromAdmin? 'Create User' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input {...register('first_name')} type="text" id="first_name"  placeholder="First Name" className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
            {errors.first_name && <p className="text-red-500">First Name is required</p>}
          </div>
          <div>
            <input {...register('last_name')} type="text" id="last_name"  placeholder="Last Name" className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
            {errors.last_name && <p className="text-red-500">Last Name is required</p>}
          </div>
          <div>
            <input {...register('username')} type="text" id="username"   placeholder="Username" className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
            {errors.username && <p className="text-red-500">Username is required</p>}
          </div>
          <div>
            <input {...register('email')} type="email" id="email" name="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
            {errors.email && <p className="text-red-500">Invalid email address</p>}
          </div>
          <div>
            <input {...register('password')} type="password" id="password" placeholder="Password" className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
            {errors.password && <p className="text-red-500">Password is required</p>}
          </div>
          <div>
            <input {...register('confirm_password')} type="password" id="confirm_password"  placeholder="Confirm Password" className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
            {errors.confirm_password && <p className="text-red-500">Confirm Password is required</p>}
          </div>
          <div className="relative">
          {imageUrl ? (
                                    <img src={imageUrl} alt="Profile" className="w-12 h-12 object-cover rounded-full mr-2" />
                                ) : (
                                    null
                                )}
            <input {...register('profile_pic')} type="file" onChange={handleProfilePictureChange} className="mt-2 text-gray-800 opacity-0 absolute left-0 top-0" />
            <label htmlFor="profile_pic" className="cursor-pointer bg-sky-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Upload Profile Picture</label>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{fromAdmin? 'Submit' : 'Sign Up'}</button>
        </form>

        {!fromAdmin && <Link to={'/signin'} className='text-white' >New User? signin</Link>}
      </div>
    </div>
  );
}

export default SignUp;

