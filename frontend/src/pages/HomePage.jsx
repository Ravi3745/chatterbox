
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function HomePage() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const navigate = useNavigate();
 
// if user already login push redirect him to the chats page
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user) navigate('/chats');
  },[navigate])
  return (
    <>
    <div className='flex flex-col items-center justify-center '>
    <div className='w-96 border items-center text-center font-medium  rounded-md my-4 p-3 '>
      <span className='text-3xl text-white'>Chatter Box</span>
    </div>

    <div className="flex justify-center w-full ">
    <span
            className={`inline-block w-48 text-center cursor-pointer  p-2  ${
              isLoginPage ? 'bg-violet-950  border-b-1 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setIsLoginPage(true)}
          >
            Login
          </span>
          <span
            className={`inline-block w-48 text-center cursor-pointer   p-2 ${
              !isLoginPage ? 'bg-violet-950  text-white' : 'bg-gray-200'
            }`}
            onClick={() => setIsLoginPage(false)}
          >
            Signup
          </span>
    </div>

   
  </div>
    
    
    {isLoginPage ? <Login /> : <Signup />}
    </>
    

   
  )
}
