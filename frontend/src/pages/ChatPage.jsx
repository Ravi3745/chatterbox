import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatContextProvider';
import NavBar from '../components/NavBar';
import ChatsSection from '../components/ChatsSection';
import ChatBox from '../components/ChatBox';

export default function ChatPage() {
    const { user } = ChatState();

    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div className="grid-container">
            <div className="navbar">
                {user && <NavBar />}
            </div>

            <div className="chats-section-wrapper">
                {user && <ChatsSection fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </div>

            <div className="chat-box">
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </div>
        </div>
    );
}
