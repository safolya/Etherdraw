"use client";

import { useState,useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

export default function ChatRoomClient({message,id}: {id: string,message:{message:string}[]}){
    const {socket, loading} = useSocket();
    const [chats, setChats]= useState(message);
    useEffect(()=>{
     if(socket && !loading){
        socket.send(JSON.stringify({
            type:"join_room",
            roomId:id
        }));


        socket.onmessage=(event)=>{
            const data=JSON.parse(event.data);
            if(data.type === "chat"){
                setChats(c => [...c,data.message])
            }
        }

     }

    },[socket,loading,id])
}