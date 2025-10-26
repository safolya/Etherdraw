"use client"
import { useRef,useEffect, useState } from "react";
import { initDraw } from "@/app/draw";
import { WS_URL } from "@/config";
import { Canvas } from "./canvas";

export default function CanvasWs({roomId}:{roomId:string}){
   
   const [socket,setSocket]=useState<WebSocket | null>(null);

   useEffect(()=>{
    const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNmU5YWViMi00ZTdlLTQyN2MtYTM2Yi01NjdiN2RlZWUxNGMiLCJpYXQiOjE3NjE1MDk0MzF9.zxLiAf4dzZeOOosILte29dHhochZIr0bIbrgj6SUdv4`);
    ws.onopen=()=>{
        setSocket(ws);
        ws.send(JSON.stringify({
            type:"join_room",
            roomId
        }))
    }
   },[])

    

    if(!socket){
        return <div>
            <h1>connecting to server</h1>
        </div>
    }

    return <div>
        <Canvas roomId={roomId} socket={socket}/>
    </div>
}