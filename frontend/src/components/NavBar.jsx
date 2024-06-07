/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faEllipsisVertical, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import ProfileModal from '../miscellaneous/ProfileModal';
import React, { useState } from 'react'
import { ChatState } from '../context/ChatContextProvider';
import { useNavigate } from 'react-router-dom';
import SideOver from './SideOver';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getSender } from '../config/chatLogics';
import NotificationBadge from '../miscellaneous/NotificationBadge';

export default function NavBar() {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading,setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const [showModal, setShowModal] =useState(false);
    const [open, setOpen] = useState(false)
    


    const navigate = useNavigate();

    const {user, setSelectedChat, chats, setChats, notification, setNotification} = ChatState();

    const signOutHandler=()=>{
      localStorage.removeItem("userInfo");
      navigate('/');
    }


    const handleSearch = async () => {
      

      if (!search || search.trim().length === 0) {
        toast("Enter a name to search");
        return; // Exit early if search is empty
      }
    // console.log(search);
      try {
        setLoading(true); // Set loading to true
    
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        };
    
        const { data } = await axios.get(`http://localhost:8000/user?search=${search}`, config);
        // console.log(data, "search results");
        setSearchResults(data);
      } catch (error) {
        console.error(error);
        toast("Something went wrong");
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    const accessChat = async (userId)=>{
        
      try{

        console.log('in axxess chat')
          setLoadingChat(true);
          
          const config = {
            headers: {
              "Content-type":"application/json",
              Authorization: `Bearer ${user.token}`
            }
          };

          const {data} = await axios.post("http://localhost:8000/chat",{userId}, config);
          console.log(data);
          setLoadingChat(false);
        
          setSelectedChat(data);
          
        }catch(err){
          toast("error fetching the chats");
        }
    }

    const toggleDropdown = () => {
      const dropdown = document.getElementById("myDropdown");
      dropdown.classList.toggle("show");
  }

  const toggleNotiDropdown = () => {
    const dropdown = document.getElementById("notification-content");
    dropdown.classList.toggle("show");
}
    // console.log(user)
  
    return (
    <>
        <div className="input-container bg-blue-900 p-2 cursor-pointer" onClick={()=>setOpen(!open)}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          {/* <input type="text" className="search-input" placeholder="Search..." /> */}
          <h3 className='text-white capitalize font-mono text-lg'>Search user</h3>
        </div>

        <h3 className='text-slate-50 font-mono text-2xl font-semibold'>Chatter-Box</h3>
      
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',  }}>
            <div style={{ marginRight: '10px' }}>
              <NotificationBadge count={notification.length} />
              <FontAwesomeIcon style={{cursor:'pointer'}} icon={faBell} className='text-2xl text-white mx-3' onClick={toggleNotiDropdown} />
            </div>

            {/* notification drop down */}
            <div id="notification-content" className="dropdown-content">
                    {!notification.length && "No New Messages"}
                    {notification.map((notif) => (
                        <span className='m-4  bottom-2 cursor-pointer' key={notif._id} onClick={()=>{
                          setSelectedChat(notif.chat);
                          setNotification(notification.filter((n)=>n!==notif));
                          toggleNotiDropdown();
                        }}>
                            {notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}` : `New Message from ${getSender(user, notif.chat.users)}`}
                        </span>
                    ))}
                </div>

        <div>
            <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src={user.pic} alt={user.name} />
         </div>
         <div>
         <FontAwesomeIcon style={{cursor:'pointer'}} icon={faEllipsisVertical} className='text-slate-200 text-4xl mr-4 ml-4' onClick={toggleDropdown}/>
         <div id="myDropdown" className="dropdown-content">
          <a href="#">Profile<FontAwesomeIcon icon={faUser} className='ml-5' onClick={()=>setShowModal(!showModal)}/></a>
          <a href="#">Logout <FontAwesomeIcon icon={faArrowRightFromBracket} className='ml-3' onClick={signOutHandler}/></a>
          
         </div>
         </div>
         {/* modal */}
        </div>
        {showModal && <div className='modal'>
          <ProfileModal user={user} setShowModal={setShowModal} showModal={showModal}/>
        </div>}
        {/* side over */}
        <SideOver open={open} setOpen={setOpen} handleSearch={handleSearch} setSearch={setSearch} searchResults={searchResults} accessChat={accessChat} />
        
    </>
  )
}
