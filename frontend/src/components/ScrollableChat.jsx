import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isSameSender, isSameSenderMargin, isSameUser, shouldShowSenderImage } from '../config/chatLogics';
import { ChatState } from '../context/ChatContextProvider';

function ScrollableChat({ messages }) {
    const { user } = ChatState();

    return (
        <ScrollableFeed>
            {messages && messages.map((m, index) => (
                <div style={{ display: 'flex', textAlign:'center', alignItems:'center' }} key={m._id}>
                    {
                        shouldShowSenderImage(messages, m, index, user._id) && (
                            <div className='mr-2 p-1'>
                                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={m.sender.pic} alt={m.sender.name} />
                            </div>
                        )
                    }
                    <span className='' style={{
                        backgroundColor: `${m.sender._id === user._id ? 'gray' : 'green'}`,
                        borderRadius: '20px', padding: '5px 15px', maxWidth: '300px',
                        marginLeft: isSameSenderMargin(messages, m, index, user._id),
                        marginTop: isSameUser(messages, m, index) ? 3 : 10,
                        wordWrap: 'break-word' // Add this CSS property
                    }}>
                        {m.content}
                    </span>
                </div>
            ))}
        </ScrollableFeed>
    )
}

export default ScrollableChat;
