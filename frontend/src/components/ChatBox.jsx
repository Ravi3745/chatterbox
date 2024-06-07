import React from 'react'
import { ChatState } from '../context/ChatContextProvider'
import SingleChat from './SingleChat';

export default function ChatBox({fetchAgain, setFetchAgain}) {
  const {selectedChat} = ChatState();
  
  return (
    <div className='w-full bg-gray-300 h-full'>

      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  )
}
