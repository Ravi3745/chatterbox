import React from 'react'
import { ChatState } from '../context/ChatContextProvider'

export default function ChatBox({fetchAgain, setFetchAgain}) {
  const {selectedChat} = ChatState();
  
  return (
    <div className='bg-slate-400 w-full h-full'>

      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  )
}
