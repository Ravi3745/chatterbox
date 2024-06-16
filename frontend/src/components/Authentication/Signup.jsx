
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Spinner from '../../utilities/Spinner';

const Signup = () => {
  
  const [signUpData,setSignUpData] = useState({name:"",email:"",password:"",confirmPassword:"",pic:""})
  const [showPassword,setShowPassword]= useState(false);
  const [loading, setLoading] = useState(false); 
  
  const navigate = useNavigate();

  async function handleSubmit  (e){
    e.preventDefault();
    if(signUpData.password!==signUpData.confirmPassword){
      toast("password is not matching");
      return;
    }
    setLoading(true);
    const {name, email, password,pic} = signUpData;
    try {
      const config={
        headers:{
          "Content-type":"application/json"
        }
      }

      const {data} = await axios.post('http://localhost:8000/user',{
        name,email,password,pic
      },config);
      toast("Signup successful");
      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      toast(error);
      setLoading(false);
    }
    setSignUpData({name:"",email:"",password:"",confirmPassword:"",pic:""});
    
  }



  function togglePasswordVisibility(){
    setShowPassword(!showPassword);
  }

  function profilePicUpload(pic) {
    setLoading(true);
    if (!pic) {
      toast("no picture selected");
      return;
    }
    if (pic.type === 'image/jpeg' || pic.type === 'image/png') { 
      const data = new FormData();
      data.append('file', pic);
      data.append("upload_preset", "Chatter-box"); 
      data.append("cloud_name", "chatterbox37"); 
  
      fetch("https://api.cloudinary.com/v1_1/chatterbox37/image/upload", { 
        method: "POST",
        body: data
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data); 
          setSignUpData({ ...signUpData, pic: data.secure_url });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error uploading image: ', error);
          toast("Error uploading image");
          setLoading(false);
        });
    }else {
      toast("Unsupported file format. Please upload a JPG or PNG file.");
      setLoading(false);
      return;
    }
  
  }
  

  return (
   <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight  text-white">
            Sign in to your account
          </h2>
        </div>

        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3"  onSubmit={handleSubmit}>
            
          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Name
              </label>
              <div className="">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={signUpData.name}
                  onChange={(e)=>setSignUpData({...signUpData,name:e.target.value})}
                  required
                  className="block bg-gray-200 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6  text-white">
                Email address
              </label>
              <div className="">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={signUpData.email}
                  onChange={(e)=>setSignUpData({...signUpData,email:e.target.value})}
                  required
                  className="block bg-gray-200 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
               
              </div>
              <div className="">
                <input
                  id="password"
                  name="password"
                  type={showPassword?'text':"password"}
                  autoComplete="current-password"
                  required
                  value={signUpData.password}
                  onChange={(e)=>setSignUpData({...signUpData,password:e.target.value})}
                  className="block w-full bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
          {/* confirm password */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium leading-6  text-white">
              Confirm password
            </label>
            <div className="">
              <input
                id="confirm-password"
                name="confirm-password"
                type={showPassword?'text':"password"}
                autoComplete="confirm-password"
                required
                value={signUpData.confirmPassword}
                onChange={(e)=>setSignUpData({...signUpData,confirmPassword:e.target.value})}
                className="block w-full bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
              />
               
                  {showPassword ? (
                    <FaEye className="h-5 w-5 text-gray-400 cursor-pointer m-1" onClick={togglePasswordVisibility} />
                  ) : (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 cursor-pointer m-1" onClick={togglePasswordVisibility} />
                  )}
                
              
            </div>
          </div>
          {/* uplaod file */}

          <div>
          <label htmlFor="profile_pic" className="block text-sm font-medium leading-6  text-white">
            Upload pic
          </label>
          <div className="">
            <input
              id="profile_pic"
              name="profile_pic"
              type="file"
              autoComplete="profile_pic"
              // required
              accept='/image/*'
              
              onChange={(e)=>profilePicUpload(e.target.files[0])}
              className="block  w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
            
          </div>
          </div>

          {/* submit button */}

            <div>
              <button
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-violet-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading?<Spinner />:"Sign in"}
              </button>
            </div>
          </form>

         
        </div>
      </div>
   </>
  )
}

export default Signup;