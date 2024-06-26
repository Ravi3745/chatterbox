import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ChatContext = createContext();

export const ChatState = ()=>{

    return useContext(ChatContext);
}

const ChatContextProvider= ({children})=>{
    
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notification, setNotification] = useState([]);

    // getting userInfo from local storage that we get from server during login 
    useEffect(()=>{
       const userInfo = JSON.parse( localStorage.getItem("userInfo"));
       setUser(userInfo);
    //    console.log(userInfo)
       
    //    if(userInfo){
        
    //     navigate('/')
    //    }
    },[navigate])
    return (
        <ChatContext.Provider value={{user,setUser, selectedChat , setSelectedChat, chats, setChats, notification, setNotification}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider;