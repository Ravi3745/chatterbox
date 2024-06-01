import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


const ChatContext = createContext();

export const ChatState = ()=>{

    return useContext(ChatContext);
}

const ChatContextProvider= ({children})=>{
    
    const history = useHistory();
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);

    // getting userInfo from local storage that se get from server during login 
    useEffect(()=>{
       const userInfo = JSON.parse( localStorage.getItem("userInfo"));
       setUser(userInfo);
    //    console.log(userInfo)
       
    //    if(userInfo){
        
    //     history.pushState('/')
    //    }
    },[history])
    return (
        <ChatContext.Provider value={{user,setUser, selectedChat , setSelectedChat, chats, setChats}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider;