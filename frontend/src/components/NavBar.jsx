import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faEllipsisVertical, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import ProfileModal from '../miscellaneous/ProfileModal';
import React, { useState, useEffect } from 'react';
import { ChatState } from '../context/ChatContextProvider';
import { useNavigate } from 'react-router-dom';
import SideOver from './SideOver';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getSender } from '../config/chatLogics';
import NotificationBadge from '../miscellaneous/NotificationBadge';

export default function NavBar({fetchAgain, setFetchAgain}) {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [profileDropDown, setProfileDropDown] = useState(false);
    const [notiDropDown, setNotiDropDown] = useState(false);

    
    const navigate = useNavigate();
    const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('#notification-content') && !event.target.closest('#noti-icon')) {
                setNotiDropDown(false);
            }
            if (!event.target.closest('#myDropdown') && !event.target.closest('#profile-icon')) {
                setProfileDropDown(false);
            }
            if (!event.target.closest('.modal')) {
                setShowModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    

    const signOutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate('/');
    }

    const handleSearch = async () => {
        if (!search || search.trim().length === 0) {
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.get(`http://localhost:8000/user?search=${search}`, config);
            setSearchResults(data);
        } catch (error) {
            console.error(error);
            toast("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const accessChat = async (userId) => {
        
      const existingChat = chats.find(chat => 
        !chat.isGroupChat && 
        chat.users.find(user => user._id === userId)
      );

     if (existingChat) {
        setSelectedChat(existingChat);
        toast("User already added");
        return;
     }
      
      try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.post("http://localhost:8000/chat", { userId }, config);
            setLoadingChat(false);
            setSelectedChat(data);
            setChats([data, ...chats]);  

        } catch (err) {
            toast("error fetching the chats");
        }
    }

    return (
        <>
            <div className="input-container  bg-violet-900 p-2 cursor-pointer" onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                <h3 className='text-white capitalize font-mono text-lg hidden md:block'>Search user</h3>
            </div>
            <h3 className='text-slate-50 font-mono text-2xl font-semibold'>Chatter-Box</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
                <div style={{ marginRight: '10px' }}>
                    <NotificationBadge count={notification.length} />
                    <FontAwesomeIcon id="noti-icon" style={{ cursor: 'pointer' }} icon={faBell} className='text-2xl text-white mx-3' onClick={() => setNotiDropDown(!notiDropDown)} />
                </div>
                <div id="notification-content" className={`dropdown-content ${notiDropDown ? 'show' : ''}`}>
                    {!notification.length && "No New Messages"}
                    {notification.map((notif) => (
                        <span className='m-4 bottom-2 cursor-pointer' key={notif._id} onClick={() => {
                            setSelectedChat(notif.chat);
                            setNotification(notification.filter((n) => n !== notif));
                            setNotiDropDown(false);
                        }}>
                            {notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}` : `New Message from ${getSender(user, notif.chat.users)}`}
                        </span>
                    ))}
                </div>
                <div>
                    <img className=" h-12 w-12 rounded-full ring-2 ring-white hidden md:inline-block" src={user.pic} alt={user.name} />
                </div>
                <div>
                    <FontAwesomeIcon id="profile-icon" style={{ cursor: 'pointer' }} icon={faEllipsisVertical} className='text-slate-200 text-4xl mr-4 ml-4' onClick={() => setProfileDropDown(!profileDropDown)} />
                    <div id="myDropdown" className={`dropdown-content ${profileDropDown ? 'show' : ''}`}>
                        <a href="#" onClick={() => setShowModal(!showModal)}>Profile<FontAwesomeIcon icon={faUser} className='ml-5' /></a>
                        <a href="#" onClick={signOutHandler}>Logout <FontAwesomeIcon icon={faArrowRightFromBracket} className='ml-3' /></a>
                    </div>
                </div>
            </div>
            {showModal && <div className='modal'>
                <ProfileModal user={user} setShowModal={setShowModal} showModal={showModal} />
            </div>}
            <SideOver open={open} setOpen={setOpen} handleSearch={handleSearch} setSearch={setSearch} searchResults={searchResults} accessChat={accessChat} loading={loading} />
        </>
    )
}
