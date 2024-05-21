
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";

const Signup = () => {
  
  const [signUpData,setSignUpData] = useState({email:"",password:"",confirmPassword:"",pic:""})
  const [showPassword,setShowPassword]= useState(false);

  function handleSubmit(e){
    e.preventDefault();
    console.log(signUpData);
  }

  function togglePasswordVisibility(){
    setShowPassword(!showPassword);
  }
  return (
   <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6"  onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={signUpData.email}
                  onChange={(e)=>setSignUpData({...signUpData,email:e.target.value})}
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
                  type={showPassword?'text':"password"}
                  autoComplete="current-password"
                  required
                  value={signUpData.password}
                  onChange={(e)=>setSignUpData({...signUpData,password:e.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
          {/* confirm password */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm password
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type={showPassword?'text':"password"}
                autoComplete="confirm-password"
                required
                value={signUpData.confirmPassword}
                onChange={(e)=>setSignUpData({...signUpData,confirmPassword:e.target.value})}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
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
          <label htmlFor="profile_pic" className="block text-sm font-medium leading-6 text-gray-900">
            Upload pic
          </label>
          <div className="mt-2">
            <input
              id="profile_pic"
              name="profile_pic"
              type="file"
              autoComplete="profile_pic"
              required
              accept='/image/*'
              value={signUpData.pic}
              onChange={(e)=>setSignUpData({...signUpData,pic:e.target.files[0]})}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
            
          </div>
          </div>

          {/* submit button */}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
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
   </>
  )
}

export default Signup;