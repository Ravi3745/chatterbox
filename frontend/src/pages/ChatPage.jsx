// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { ChatState } from '../context/ChatContextProvider';
// import NavBar from '../components/NavBar';
// import ChatsSection from '../components/ChatsSection';
// import ChatBox from '../components/ChatBox';

// export default function ChatPage() {
//     const { user, selectedChat } = ChatState();

//     return (
//         <div className="grid-container">
//             <div className="navbar">
//                 <NavBar />
//             </div>

//             <div className={`chats-section-wrapper ${!selectedChat ? ' col-span-3    md:col-span-1' : 'hidden md:inline-block'}`}>
//                  <ChatsSection />
//             </div>

//             <div className={`chat-box ${selectedChat ? 'col-span-3 sm:col-span-2' : 'hidden md:inline-block'}`}>
//                  <ChatBox />
//             </div>
//         </div>
//     );
// }


import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatContextProvider';
import NavBar from '../components/NavBar';
import ChatsSection from '../components/ChatsSection';
import ChatBox from '../components/ChatBox';

export default function ChatPage() {
   

    const [fetchAgain, setFetchAgain] = useState(false);

    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();
    return (
        <div className="grid-container">
            <div className="navbar">
                {user && <NavBar fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
            </div>

            <div className={`chats-section-wrapper ${!selectedChat ? ' col-span-3    md:col-span-1' : 'hidden md:inline-block'}`}>
                {user && <ChatsSection fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </div>

            <div className={`chat-box ${selectedChat ? '  col-span-3 max-sm:col-span-2' : 'hidden md:inline-block'}`}>
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </div>
        </div>
    );
}


