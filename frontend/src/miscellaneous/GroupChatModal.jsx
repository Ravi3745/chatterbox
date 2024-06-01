import React, { useState } from 'react'
import { ChatState } from '../context/ChatContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../utilities/Spinner';
import SearchList from '../components/SearchList';

export default function GroupChatModal({ setGroupModal}) {
  
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const {user,chats,setChats}=ChatState();

    const handleSearch= async (query)=>{
        console.log(query)
        if(!query){
            return;
        }
        setSearch(query);
        try {
            setLoading(true);
            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            };

            const {data} = await axios.get(`http://localhost:8000/user?search=${search}`, config);
            console.log(data,"search result")
            setLoading(false);
            setSearchResults(data);
        } catch (error) {
            console.log(error);
            toast("Error in searching user")
        }
    }
    
    const handleSubmit=async ()=>{
        try {

            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            };

            const {data}= await axios.post(`http://localhost:8000/chat/group`,{
                name:groupChatName,
                users:JSON.stringify(selectedUser.map(u=>u._id))
            },config);

            setChats([data,...chats]);
            // to open on close the modal we are using state setGroupModal
            setGroupModal(false);
            toast("new group chat created")
            
        } catch (error) {
            toast('something went wrong')
        }
    }

    const removeFromGroup = (userToRemove) => {
        // Filter out the user to remove based on its _id
        const updatedUsers = selectedUser.filter(user => user._id !== userToRemove._id);
        setSelectedUser(updatedUsers);
    }
      

    const handleGroup=(userToAdd)=>{
       console.log("inhandel group")
        if(selectedUser.includes(userToAdd)){
            toast("user already added");
            return;
        }
        
        setSelectedUser([...selectedUser,userToAdd]);
    }

    return (
    <div className='text-black'>
        
         <div className="flex min-h-full flex-1 flex-col bg-slate-200 rounded-sm w-96 justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create Group Chat
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
             
              <div className="mt-2">
                <input
                type="text"
                onChange={(e)=>setGroupChatName(e.target.value)}
                placeholder='Group Name...'
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
             
              <div className="mt-2">
                <input
                  placeholder='Search users eg. john, mike etc...'
                 
                  type="text"
                    onChange={(e)=>handleSearch(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>


            {/* selected user */}
            <div className="flex flex-wrap">
            {selectedUser.map(user => (
            <span className='bg-purple-700 rounded-md m-1 px-2 text-white' key={user._id}>
                {user.name} 
                <span className='m-1 text-red-900 font-bold text-lg cursor-pointer' onClick={() => removeFromGroup(user)}>x</span>
            </span>
                ))}
            </div>
           

            <div>
                {loading?<Spinner />:(<SearchList groupModal={true} handleGroup={handleGroup} searchResults={searchResults.slice(0,4)}/>)}
            </div>


            <div className='flex '>
              <button
                type="submit"
                className=" m-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Group
              </button>
              <button
                type="button"
                className=" m-2 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={()=>setGroupModal(false)}
              >
                Close
              </button>
            </div>
          </form>

          
        </div>
      </div>

       
        
    </div>
  )
}
