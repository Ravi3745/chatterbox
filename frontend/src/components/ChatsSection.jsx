import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatContextProvider';
import { toast } from 'react-toastify';
import Spinner from '../utilities/Spinner';
import { getSender, getSenderPic } from '../config/chatLogics';
import axios from 'axios';
import GroupChatModal from '../miscellaneous/GroupChatModal';

export default function ChatsSection({ fetchAgain }) {
    const [loggedUser, setLoggedUser] = useState(null);
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
    const [groupModal, setGroupModal] = useState(false);

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.get("http://localhost:8000/chat", config);
            if (!chats.find((c) => c._id === data._id)) {
                setChats([data, ...chats]);
            }
            setChats(data);
        } catch (error) {
            toast("Error occurred while fetching chats");
            console.log(error);
        }
    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
    },[fetchAgain]);

    return (
        <div className='bg-zinc-800 h-full text-white flex flex-col'>
            <div className='flex justify-between p-4 items-center'>
                <h2 className='font-bold font-sans text-xl antialiased'>My Chats</h2>
                {groupModal && <div className='group-modal'>
                    <GroupChatModal user={user} setGroupModal={setGroupModal} groupModal={groupModal} />
                </div>}
                <button className='drop-shadow-md bg-violet-900 p-2' onClick={() => setGroupModal(!groupModal)}>Add Group +</button>
            </div>

            <div className='flex  flex-col text-white chatlist-overflow'>
                <div className='p-2'>
                {chats ? (
                        <div className=''>
                            {chats.map((chat) => (
                                <div key={chat._id} onClick={() => setSelectedChat(chat)} className="cursor-pointer bg-zinc-900 my-2 p-3 flex h-16 items-center text-lg">
                                    <img src={chat.isGroupChat ? chat.groupImage : getSenderPic(loggedUser, chat.users)} alt="User" className="w-10 h-10 rounded-full mr-2" />
                                    {!chat.isGroupChat ? (getSender(loggedUser, chat.users)) : (chat.chatName)}
                                </div>
                            ))}
                        </div>
                    ) : <Spinner />}
                </div>  
                    
                
            </div>
        </div>
    );
}
