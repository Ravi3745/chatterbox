
import axios from 'axios'
import { useEffect, useState } from 'react';
export default function ChatPage() {

    const [chats,setChats] = useState([])
    const fetchChats= async ()=>{
        const {data} = await axios.get('http://localhost:8000/chats');

        setChats(data);
    }

    useEffect(()=>{
        fetchChats();
    },[])

  return (
    <div>{chats.map((chat)=>{
        return <h3 key={chat._id}>{chat.chatName}</h3>
    })}</div>
  )
}
