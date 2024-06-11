import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignin, adminSignin } from "../../features/authSlice";
import { Link } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';

const Login = ({ fromAdmin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromAdmin) {
      if (username && password) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:9000/account/signin/",
            {
              username: username,
              password: password,
            }
          );
          dispatch(userSignin(response.data));
          navigate("/user-home");
        } catch (error) {
          setErrorMessage("invalid credentials");
        }
      } else {
        setErrorMessage("both field is required");
      }
    } else {
      if (username && password) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:9000/account/admin-signin/",
            {
              username: username,
              password: password,
            }
          );
          dispatch(adminSignin(response.data));
          navigate("/admin-home");
        } catch (error) {
          setErrorMessage("invalid credentials");
        }
      } else {
        setErrorMessage("both field is required");
      }
    }
  };

  return (
   <div className="h-screen relative"> {/* Add relative positioning to the container */}
   <Link to={'/'} className="absolute top-10 left-20 bg-cyan-950 rounded-full  p-2"> {/* Position the link at the top left */}
   <FaArrowLeft className="text-white rounded-full h-6 w-6"  />
   </Link>
   <div className="flex justify-center items-center h-full mt-0"> {/* Add margin-top to push content down */}
     <div className="w-4/12 h-auto border bg-blue-950 p-8 rounded-lg">
       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-white mb-8 ">
           Sign In
         </h2>
       </div>
       <form onSubmit={handleSubmit}>
         <div className="mb-4">
           <label
             htmlFor="username"
             className="text-white mb-1 inline-block"
           >
             Username
           </label>
           <input
             type="text"
             id="username"
             name="username"
             onChange={(e) => setUsername(e.target.value)}
             className="w-full px-3 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white"
           />
         </div>
 
         <div className="mb-4">
           <label
             htmlFor="password"
             className="text-white mb-1 inline-block"
           >
             Password
           </label>
           <input
             type="password"
             id="password"
             name="password"
             onChange={(e) => setPassword(e.target.value)}
             className="w-full px-3 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:bg-white"
           />
         </div>
         {errorMessage && (
           <div className="mb-4">
             <p className="text-red-700">{errorMessage}</p>
           </div>
         )}
         <button
           type="submit"
           className="w-52 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
         >
           Sign In
         </button>
       </form>
       {!fromAdmin && (
         <Link to={"/signup"} className="text-white">
           New User? signup
         </Link>
       )}
     </div>
   </div>
 </div>
 
  );
};

export default Login;
