import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatContextProvider';
import { toast } from 'react-toastify';
import Spinner from '../utilities/Spinner';
import { getSender } from '../config/chatLogics';
import axios from 'axios';
import GroupChatModal from '../miscellaneous/GroupChatModal';


export default function ChatsSection({fetchChats}) {

  const [loggedUser, setloggedUser] = useState(null);
  
  const {user, selectedChat, setSelectedChat, chats, setChats} = ChatState();

  const [groupModal,setGroupModal] = useState(false);
  
  const fetchChats = async ()=>{
    try {
      
      const config ={
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      }
      console.log("iam in chat section");

      const {data} = await axios.get("http://localhost:8000/chat",config);

      console.log(data,"iam in fetch chats")
      if(!chats.find((c) => c._id === data._id)) setChats([data,...chats]);

      setChats(data);
     
    } catch (error) {
      toast("Error occur");
      console.log(error);
    }
  }

  useEffect(()=>{
    setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  },[fetchChats])

  return (
    <div className='bg-green-900 h-full text-white' >
     
     <div className='flex justify-between p-4 item-center'>
      <h2 className='font-bold font-sans text-xl antialiased'>My Chats</h2>
      {groupModal &&  <div className='modal'> 
      <GroupChatModal user={user} setGroupModal={setGroupModal} groupModal={groupModal}/>
      </div>}
      
      <button className='drop-shadow-md bg-slate-900 p-2' onClick={()=>setGroupModal(!groupModal)}>Add Group +</button>
      
     
     </div>

      <div className='flex flex-col p-3 w-100% bg-slate-900 text-white'>

        {chats?(
          <div>
              {chats.map((chat)=>(
                <div onClick={()=>setSelectedChat(chat)} className="cursor-pointer">
                  
                  <div className='bg-green-400 my-4'>
                    {!chat.isGroupChat?(getSender(loggedUser,chat.users)):(chat.chatName)}
                  </div>
                </div>
              ))}
          </div>
         
        ):<Spinner />}
      </div>

    
    </div>
  )
}
