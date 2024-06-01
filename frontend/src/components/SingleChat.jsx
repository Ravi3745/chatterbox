import React, { useState } from 'react';
import { ChatState } from '../context/ChatContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { getSenderFull, getSender } from '../config/chatLogics';
import UpdateGroupChatModal from '../miscellaneous/UpdateGroupChatModal';
import ProfileModal from '../miscellaneous/ProfileModal';

function SingleChat({ fetchAgain, setFetchAgain }) {
    const { user, selectedChat, setSelectedChat } = ChatState();
    const [showProfile, setShowProfile] = useState(false);
    const [showUpdateModal,setShowUpdateModal] = useState(false);
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
                                {showUpdateModal && <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setShowUpdateModal={setShowUpdateModal}/>}
                                
      
                                </div>
                            </>
                        )}
                    </div>
                    <div className='bg-white flex-grow'></div>
                </>
            ) : (
                <div className='h-full grid text-3xl font-serif place-content-center'>Click on user to start chatting </div>
            )}
        </div>
    );
}

export default SingleChat;
