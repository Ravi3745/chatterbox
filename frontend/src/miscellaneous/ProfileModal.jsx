import React from 'react'

export default function ProfileModal(props) {
  
    const {user}= props;
    console.log(user)
    return (
    <div className='flex flex-col items-center justify-center bg-slate-200 h-80 w-96 rounded-lg p-4 shadow-lg'>
        <div className="text-xl font-semibold mb-2">{user.name}</div>
        <img className='border-2 border-black w-48 h-48 rounded-full mb-2' src={user.pic} alt='User Profile' />
        <div className="text-sm">{user.email}</div>
    </div>
  )
}
