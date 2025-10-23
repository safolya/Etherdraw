import axios from "axios";
import { BACKEND_URL } from "../app/config";
import ChatRoomClient from "./ChatRoomClient";

async function getchats(id:string){
    const response = await axios.get(`${BACKEND_URL}/chats/${id}`);
    return response.data.chats;
}


export default async function ChatRoom({id}: {id: string}){
     const chats=await getchats(id);
    return <ChatRoomClient id={id} message={chats}/>;
}