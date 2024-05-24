
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import '../App.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export default function HomePage() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  
  const history = useHistory();
// if user already login push redirect him to the chats page
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user) history.push('/chats');
  },[history])
  return (
    <>
    <div className='flex flex-col items-center justify-center '>
    <div className='w-96 border items-center text-center font-medium h-10 rounded-md my-5 p-6'>
      Chatter Box
    </div>

    <div className="flex justify-center w-full ">
    <span
            className={`inline-block w-48 text-center cursor-pointer border p-2  ${
              isLoginPage ? 'bg-indigo-500 border-b-1 text-black' : 'bg-gray-200'
            }`}
            onClick={() => setIsLoginPage(true)}
          >
            Login
          </span>
          <span
            className={`inline-block w-48 text-center cursor-pointer border  p-2 ${
              !isLoginPage ? 'bg-indigo-500 text-white' : 'bg-gray-200'
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
