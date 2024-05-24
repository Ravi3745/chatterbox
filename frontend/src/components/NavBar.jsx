/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faEllipsisVertical, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import ProfileModal from '../miscellaneous/ProfileModal';
import React, { useState } from 'react'
import { ChatState } from '../context/ChatContextProvider';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function NavBar() {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading,setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const [showModal, setShowModal] =useState(false);


    const history = useHistory();

    const {user} = ChatState();

    const signOutHandler=()=>{
      localStorage.removeItem("userInfo");
      history.push('/');
    }

    const toggleDropdown = () => {
      const dropdown = document.getElementById("myDropdown");
      dropdown.classList.toggle("show");
  }
    console.log(user)
  
    return (
    <>
        <div className="input-container">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input type="text" className="search-input" placeholder="Search..." />
        </div>

        <h3 className='text-slate-50 font-mono text-2xl font-semibold'>Chatter-Box</h3>
      
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',  }}>
            <div style={{ marginRight: '10px' }}>
              <FontAwesomeIcon style={{cursor:'pointer'}} icon={faBell} className='text-2xl text-white mx-3' />
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
        
        
    </>
  )
}
