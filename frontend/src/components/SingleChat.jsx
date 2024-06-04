import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { getSenderFull, getSender } from '../config/chatLogics';
import ScrollableChat from './ScrollableChat';
import UpdateGroupChatModal from '../miscellaneous/UpdateGroupChatModal';
import ProfileModal from '../miscellaneous/ProfileModal';
import Spinner from '../utilities/Spinner';
import axios from 'axios';
function SingleChat({ fetchAgain, setFetchAgain }) {
    
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, selectedChat, setSelectedChat } = ChatState();
    const [showProfile, setShowProfile] = useState(false);
    const [showUpdateModal,setShowUpdateModal] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    
    const fetchMessages = async ()=>{
        if(!selectedChat) return;

        try {
            const config ={
                headers:{
                   
                    Authorization:`Bearer ${user.token}`
                }
            }
            setLoading(true);
            const { data } = await axios.get(`http://localhost:8000/message/${selectedChat._id}`,config);
            console.log(messages)
            setMessages(data);
            setLoading(false);
        } catch (error) {
            toast.error("Error in fetching messages");
            return;
        }

    }

    useEffect(()=>{
        fetchMessages();
    },[selectedChat])

    const sendMessage = async (e)=> {
       
       
        console.log("hi in send msg")
        if(e.key==='Enter' && newMessage){
            e.preventDefault();
            try {
                const config ={
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${user.token}`
                    }
                }
                setNewMessage('');
                const {data} = await axios.post('http://localhost:8000/message',{
                    content:newMessage,
                    chatId:selectedChat._id
                },config);
                
               
                setMessages([...messages,data]);

            } catch (error) {
                toast.error("Fail to send message")
            }
        }
    };
   
   
    const typingHandler =(e)=> {
        setNewMessage(e.target.value);
    }

    return (
        <div className='h-full flex flex-col'>
            {selectedChat ? (
                <>
                    <div className='flex justify-between bg-slate-900 text-white text-2xl p-3'>
                        <div className='md:hidden sm:flex' onClick={() => setSelectedChat('')}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>
                        {!selectedChat.isGroupChat ? (
                            <>
                                <div>{getSender(user, selectedChat.users)}</div>
                                <div className='cursor-pointer' onClick={() => setShowProfile(!showProfile)}>
                                    <FontAwesomeIcon icon={faEye} />
                                </div>
                                <div className='modal'>{showProfile && <ProfileModal user={getSenderFull(user, selectedChat.users)} />}</div>
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                <FontAwesomeIcon className='cursor-pointer' icon={faEye} onClick={()=>setShowUpdateModal(!showUpdateModal)} />
                                <div className='modal'>
                                {showUpdateModal && <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setShowUpdateModal={setShowUpdateModal} fetchMessages={fetchMessages}/>}
                                
      
                                </div>
                            </>
                        )}
                    </div>
                    {/* messages */}

                    {loading?<div className='grid h-full place-content-center '><Spinner h={20}/></div>:
                    <div className='bg-white flex-grow p-2'>

                        <div className='messages text-black '>
                            <ScrollableChat messages={messages}/>
                        </div>
                       
                    </div>}


                    {/* input for  messages */}
                    <form className='flex justify-center bg-white' onKeyDown={sendMessage}>
                            <input type="text" className='bg-gray-200 p-3 m-4 w-full' placeholder='enter a message' onChange={typingHandler} value={newMessage}/>
                    </form>

                    
                    
                </>
            ) : (
                <div className='h-full grid text-3xl font-serif place-content-center'>Click on user to start chatting </div>
            )}


           



        </div>
    );
}

export default SingleChat;
