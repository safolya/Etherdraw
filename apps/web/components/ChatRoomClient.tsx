"use client";

import { useState, useEffect, useCallback } from "react";
import { useSocket } from "../hooks/useSocket";

export default function ChatRoomClient({message, id}: {id: string, message:{message:string}[]}) {
    const {socket, loading} = useSocket();
    const [chats, setChats] = useState(message);
    const [currentMessage, setCurrentMessage] = useState("");
    
    const handleMessage = useCallback((event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.type === "chat") {
            setChats(prevChats => [...prevChats, {message: data.message}]);
        }
    }, []);

    useEffect(() => {
        if (socket && !loading) {
            // Join room
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }));

            // Add message listener
            socket.addEventListener('message', handleMessage);

            // Cleanup on unmount or when socket changes
            return () => {
                socket.removeEventListener('message', handleMessage);
                socket.send(JSON.stringify({
                    type: "leave",
                    room: id
                }));
            };
        }
    }, [socket, loading, id, handleMessage]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentMessage.trim() || !socket) return;

        socket.send(JSON.stringify({
            type: "chat",
            roomId: id,
            message: currentMessage
        }));

        setCurrentMessage("");
    };

    return (
        <div className="chat-container" style={{
            maxWidth: '800px',
            margin: '2rem auto',
            padding: '1rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px'
        }}>
            <div className="messages-container" style={{
                height: '400px',
                overflowY: 'auto',
                border: '1px solid #333',
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: '#242424',
                borderRadius: '6px'
            }}>
                {chats.map((m, index) => (
                    <div key={index} className="message" style={{
                        margin: '0.5rem 0',
                        padding: '0.8rem',
                        backgroundColor: '#2f2f2f',
                        borderRadius: '6px',
                        color: '#ffffff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        {m.message}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                gap: '0.8rem'
            }}>
                <input
                    type="text"
                    value={currentMessage}
                    onChange={e => setCurrentMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={{
                        flex: 1,
                        padding: '0.8rem',
                        borderRadius: '6px',
                        border: '1px solid #333',
                        backgroundColor: '#2f2f2f',
                        color: '#ffffff',
                        fontSize: '1rem'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '0.8rem 1.5rem',
                        backgroundColor: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                    }}
                >
                    Send
                </button>
            </form>
        </div>
    );

}