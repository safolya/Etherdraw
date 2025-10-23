import axios from "axios";
import { BACKEND_URL } from "../../config";
import ChatRoom from "../../../components/ChatRoom";

async function getRoomid(slug: string){
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.room.id;
}

export default async function ChatRoom1({params}: {params: {slug: string}}) {
   const slug = params.slug;
   const roomId = await getRoomid(slug);
   return <ChatRoom id={roomId}/>;
}
