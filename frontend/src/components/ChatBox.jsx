import React from 'react'
import { ChatState } from '../context/ChatContextProvider'
import SingleChat from './SingleChat';
export default function ChatBox({fetchAgain, setFetchAgain}) {
  const {selectedChat} = ChatState();
  
  return (
    <div className='w-full bg-lime-950 h-full'>

      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  )
}
