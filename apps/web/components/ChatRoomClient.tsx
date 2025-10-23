"use client";

import { useState,useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

export default function ChatRoomClient({message,id}: {id: string,message:{message:string}[]}){
    const {socket, loading} = useSocket();
    const [chats, setChats]= useState(message);
    const [currentMessage, setCurrentMessage]= useState("");
    useEffect(()=>{
     if(socket && !loading){
        socket.send(JSON.stringify({
            type:"join_room",
            roomId:id
        }));


        socket.onmessage=(event)=>{
            const data=JSON.parse(event.data);
            if(data.type === "chat"){
                setChats(c => [...c,{message:data.message}])
            }
        }

     }

    },[socket,loading,id])

    return <div>
        {chats.map(m => <div>{m.message}</div>)}

        <input type="text" value={currentMessage} onChange={e => {
            setCurrentMessage(e.target.value);
        }}></input>
        <button onClick={() => {
            socket?.send(JSON.stringify({
                type: "chat",
                roomId: id,
                message: currentMessage
            }))

            setCurrentMessage("");
        }}>Send message</button>
    </div>

}