import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_CONVERSATION, SEND_MESSAGE } from '../api/mutations';
import { CheckCircleIcon, EyeIcon, PaperAirplaneIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function MessagesView() {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [addMessage] = useMutation(SEND_MESSAGE);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Fetch all conversations
    const { loading, error, data,refetch } = useQuery(GET_CONVERSATION, {
        variables: { ids: currentUser?.user?.conversations.map((conversation) => conversation._id??conversation.id) },
    });

    useEffect(() => {

        if(!localStorage.getItem('user')){
            navigate("/login")
        }
        if (data && !loading && data.conversationsUser) {
            setConversations(data.conversationsUser);
        }
        refetch();

    }, [currentUser]);

    const handleUserClick = (conversation) => {
        setSelectedConversation(conversation);
        setMessageInput('');
    };

    const handleMessageSend = async (conversation) => {
        if (messageInput.trim() !== '') {
            const { data } = await addMessage({ variables: { user: currentUser.user._id, conversation, content: messageInput } });
            const newMessage = data.createMessage;
            setSelectedConversation((prevConversation) => ({
                ...prevConversation,
                messages: [...prevConversation.messages, newMessage],
            }));
            setMessageInput('');
        }
    };



    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-4 my-10">
            <h1 className="text-2xl font-bold mb-4">Messaging App</h1>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <h2 className="text-xl font-semibold mb-2">Users:</h2>
                    <ul>
                        {conversations &&
                            conversations.map((conversation) => {
                                const otherUser = conversation.users.find((user) => user.id !== currentUser.user._id);
                                return (
                                    <li
                                        key={otherUser.id}
                                        className="flex items-center mb-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleUserClick(conversation)}
                                    >
                                        <img
                                            src={`http://127.0.0.1:8000/profiles/${otherUser.profilePicture}`}
                                            alt={otherUser.username}
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold">{otherUser.username}</h3>
                                            {conversation.messages.length > 0 && (
                                                <p className="text-gray-600">
                                                    {conversation.messages[conversation.messages.length - 1].content}
                                                    {conversation.messages[conversation.messages.length - 1].senderUsername === currentUser.user.username && (
                                                        <>
                                                            &nbsp;
                                                            <span className="text-sm text-gray-500">(You)</span>
                                                        </>
                                                    )}
                                                </p>
                                            )}

                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <div className="col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Messages:</h2>
                    <div className="h-[400px] overflow-y-scroll">
                        {selectedConversation && (
                            <ul className="space-y-4">
                                {selectedConversation.messages.map((message) => (
                                    <li
                                        key={message._id}
                                        className={`flex ${message.senderUsername === currentUser.user.username ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`bg-gray-100 p-4 rounded-lg max-w-[70%] ${message.senderUsername === currentUser.user.username ? 'ml-auto' : 'mr-auto'
                                                }`}
                                        >
                                            <p className="text-gray-800">{message.content}</p>
                                            <span className="text-sm text-gray-500">{new Date(message.createdAt).toLocaleString('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}</span>
                                            {message.status === 'sent' && (
                                                <CheckCircleIcon className="w-4 h-4 text-green-500 ml-2" />
                                            )}
                                            {message.status === 'seen' && (
                                                <EyeIcon className="w-4 h-4 text-blue-500 ml-2" />
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <form
                            className="flex items-center justify-between py-2"
                            onSubmit={(e) => {
                                e.preventDefault(); // Prevent form submission
                                handleMessageSend(selectedConversation.id); // Invoke the function separately
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                            />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4" type="submit">
                                <PaperAirplaneIcon className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
