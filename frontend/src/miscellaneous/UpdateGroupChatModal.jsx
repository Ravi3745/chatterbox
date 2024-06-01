import React, { useState } from 'react';
import { ChatState } from '../context/ChatContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../utilities/Spinner';
import SearchList from '../components/SearchList';

export default function UpdateGroupChatModal({ fetchAgain, setFetchAgain, setShowUpdateModal }) {
    const [groupChatName, setGroupChatName] = useState('');
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();

    const renameGroup = async () => {
        if (!groupChatName) return;

        try {
            setRenameLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.put('http://localhost:8000/chat/rename', {
                chatId: selectedChat._id,
                chatName: groupChatName
            }, config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            setRenameLoading(false);
            toast.error("Error in renaming group");
        }
    }

    const handleSearch = async (query) => {
        if (!query) {
            return;
        }
        setSearch(query);
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.get(`http://localhost:8000/user?search=${search}`, config);
            setLoading(false);
            setSearchResults(data);
        } catch (error) {
            console.error(error);
            toast.error("Error in searching user");
        }
    }

    
    // remove person from group
    const removeFromGroup = async (userToRemove) => {
        if (selectedChat.groupAdmin._id !== user._id) {
            toast.error("Only admin can remove someone!");
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.put('http://localhost:8000/chat/removegroup', {
                chatId: selectedChat._id,
                userId: userToRemove._id
            }, config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);

        } catch (error) {
            console.error(error);
            toast.error('Error in removing user');
        }
    }

    const handleAddUser = async (userToAdd) => {
        if (selectedUser.find(u => u._id === userToAdd._id)) {
            toast.error("User already in group");
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            toast.error("Only admin can add someone!");
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.put('http://localhost:8000/chat/addtogroup', {
                chatId: selectedChat._id,
                userId: userToAdd._id
            }, config);
            
            setSelectedUser([...selectedUser,userToAdd]);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);

        } catch (error) {
            console.error(error);
            toast.error('Error in adding user');
        }
    }

    const handleLeaveGroup = async () => {
        console.log("iam here")
        if (window.confirm("Are you sure you want to leave this group?")) {
           
            try {
                setLoading(true);
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                };
    
                const { data } = await axios.put('http://localhost:8000/chat/removegroup', {
                    chatId: selectedChat._id,
                    userId: user._id
                }, config);
    
                setSelectedChat(data);
                setFetchAgain(!fetchAgain);
                setLoading(false);
                setShowUpdateModal(false)
    
            } catch (error) {
                console.error(error);
                toast.error('Error in leaving group');
            }

    }
}

    return (
        <div className='text-black'>
            <div className="flex min-h-full flex-1 flex-col bg-slate-200 rounded-sm w-96 justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {selectedChat.chatName}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-3" >
                        <div>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    onChange={(e) => setGroupChatName(e.target.value)}
                                    placeholder='Rename Group Name...'
                                    
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                                <button
                                    type='button'
                                    onClick={renameGroup}
                                    className=" mt-2 flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {renameLoading ? <Spinner /> : "Rename"}
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <input
                                    placeholder='Search users eg. john, mike etc...'
                                    type="text"
                                    onChange={(e) => handleSearch(e.target.value)}
                                   
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                            </div>
                        </div>
                        
                        {/* already exist users */}
                        <div className="flex flex-wrap text-sm">
                            {selectedChat.users.filter(u=>u._id!==user._id).map(user => (
                                <span className='bg-purple-700 rounded-md m-1 px-2 text-white' key={user._id}>
                                    {user.name}
                                    <span className='m-1 text-red-900 font-bold text-lg cursor-pointer' onClick={() => removeFromGroup(user)}>x</span>
                                </span>
                            ))}
                        </div>

                        <div>
                            <ul role="list" className="divide-y divide-gray-100">
                                {loading ? <Spinner /> : (searchResults.slice(0, 4).map(person => {
                                    return <li key={person.email} className="flex justify-between gap-x-6 py-5 cursor-pointer" onClick={() => handleAddUser(person)} >
                                        <div className="flex min-w-0 gap-x-4">
                                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.pic} alt={person.name} />
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                                            </div>
                                        </div>
                                    </li>
                                }))}
                            </ul>
                        </div>

                        <div className='flex '>
                            <button
                                type="button"
                                onClick={()=>handleLeaveGroup()}
                                className="m-2 flex w-full justify-center rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Leave Group
                            </button>
                            <button
                                type="button"
                                className="m-2 flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => setShowUpdateModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
