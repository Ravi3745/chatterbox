// import React from 'react'

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";
import Spinner from '../../utilities/Spinner';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const Login = () => {

  const [loginData,setLoginData] = useState({email:"",password:""});
  const [showPassword,setShowPassword]= useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  function togglePasswordVisibility(){
    setShowPassword(!showPassword);
  }

  async function handleSubmit  (e){
    e.preventDefault();
    console.log("hloo1")
    setLoading(true);
   const {email,password} = loginData;
    try {
      const config ={
        headers:{
          "Content-type":"application/json"
        }
      };
      console.log("hloo2")
      const { data } = await axios.post('http://localhost:8000/user/login',{email,password},config);
      toast("Login Successful");
      
      // storing response in localstorage of browser
      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false);
      history.push('/chats');

    } catch (error) {
      toast("Something went wrong");
      setLoading(false);
    }

  }



  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Login in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={loginData.email}
              onChange={e=>setLoginData({...loginData,email:e.target.value})}
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
         
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type={showPassword?"text":"password"}
              autoComplete="current-password"
              required
              value={loginData.password}
              onChange={e=>setLoginData({...loginData,password:e.target.value})}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
          {showPassword ? (
                    <FaEye className="h-5 w-5 text-gray-400 cursor-pointer m-1" onClick={togglePasswordVisibility} />
                  ) : (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 cursor-pointer m-1" onClick={togglePasswordVisibility} />
            )}
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
             {loading?<Spinner />:"Signin"}
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}
        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Start a 14 day free trial
        </a>
      </p>
    </div>
  </div>
  )
}

export default Login;