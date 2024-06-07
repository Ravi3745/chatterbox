import React, { useEffect, useState, useRef } from 'react';
import { ChatState } from '../context/ChatContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { getSenderFull, getSender } from '../config/chatLogics';
import ScrollableChat from './ScrollableChat';
import UpdateGroupChatModal from '../miscellaneous/UpdateGroupChatModal';
import ProfileModal from '../miscellaneous/ProfileModal';
import Spinner from '../utilities/Spinner';
import axios from 'axios';
import io from 'socket.io-client';
import Lottie from 'react-lottie';
import animationData from '../utilities/typing.json';

const ENDPOINT = "http://localhost:8000";

let socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
    
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();
    const [showProfile, setShowProfile] = useState(false);
    const [showUpdateModal,setShowUpdateModal] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef(null); 
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);


    
    const [socketConnected, setSocketConnected] = useState(false);
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData :animationData,
        rendererSettings:{
            preserveAspectRatio:'xMidYMid slice'
        }
    }
    
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
            socket.emit('join chat',selectedChat._id);
        } catch (error) {
            toast.error("Error in fetching messages");
            return;
        }

    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(()=>{

        socket = io(ENDPOINT);
        socket.emit("setup",user);
        socket.on('connected',()=>setSocketConnected(true));
        socket.on('typing',()=>setIsTyping(true));
        socket.on('stop typing',()=>setIsTyping(false));
    },[]);
    
    useEffect(()=>{
        fetchMessages();

        selectedChatCompare = selectedChat;
        
    },[selectedChat]);


        console.log(notification,'----------------------')
    

    useEffect(()=>{

        socket.on("message recieved",(newMessageRecieved)=>{
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
                if(!notification.includes(newMessageRecieved)){
                    setNotification([newMessageRecieved,...notification]);
                    setFetchAgain(!fetchAgain);
                }
            }else{
                setMessages([...messages,newMessageRecieved]);
                scrollToBottom()
            }
        })
    },[messages]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    


    const sendMessage = async (e)=> {
       
       
        console.log("hi in send msg")
        if(e.key==='Enter' && newMessage){
            e.preventDefault();
            socket.emit('stop typing',selectedChat._id);
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
                
                socket.emit('new message',data);
               
                setMessages([...messages,data]);
                scrollToBottom();

            } catch (error) {
                toast.error("Fail to send message")
            }
        }
    };
   
   
    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    
        if (!socketConnected) return;
    
        if (!typing) {
            setTyping(true);
            socket.emit('typing', selectedChat._id);
        }
    
        let lastTypingTime = new Date().getTime();
        let timerLength = 3000;
    
        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timeDiff = timeNow - lastTypingTime;
    
            if (timeDiff >= timerLength && typing) {
                socket.emit('stop typing', selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };
    

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

                    {loading?<div className='grid h-full place-content-center  '><Spinner h={20}/></div>:
                    
                    <div className='bg-white flex-grow p-2 messages ' ref={chatContainerRef}>

                        <div className=' text-black  '>
                            <ScrollableChat messages={messages}/>
                        </div>
                        {/* {isTyping?<span>Typing..</span>:<></>} */}
                    </div>}


                    {/* input for  messages */}
                    <div className='bg-white'>
                    {isTyping?<div className='ml-2'><Lottie  style={{margin:'0px'}} width={70} options={defaultOptions} /></div>:<><div className='text-white'>ertt </div></>}
                    <form className='flex justify-center' onKeyDown={sendMessage}>
                          
                        <input type="text" className='bg-gray-200 p-3 mr-2 ml-2 mb-2 w-full rounded-md'  placeholder='enter a message' onChange={typingHandler} value={newMessage}/>
                    </form>
                    </div>
                    

                    
                    
                </>
            ) : (
                <div className='h-full grid text-3xl font-serif place-content-center'>Click on user to start chatting </div>
            )}


           



        </div>
    );
}

export default SingleChat;
