import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

interface User{
  ws: WebSocket,
  room:string[],
  userId:string
}

const users: User[] =[]

function checkUser(token:string): string|null{
  try {
    const decoded=jwt.verify(token,JWT_SECRET);

    if(typeof decoded == "string"){
      return null
    }

  if(!decoded || (decoded as JwtPayload).userId){
    return null
  }
  return decoded.userId;

  } catch (error) {
    return null
  }
    

}

wss.on('connection', function connection(ws,request) {
  ws.on('error', console.error);
  const url=request.url;
  if(!url){
    return
  }

  const queryParams=new URLSearchParams(url.split('?')[1]);
  const token=queryParams.get("token")||"";
  const userId=checkUser(token);

  if(userId==null){
    ws.close();
    return
  }

  users.push({
    ws,
    room:[],
    userId
  })



  ws.on('message', function message(data) {
    let parsedData;
    if(typeof data != "string"){
      parsedData=JSON.parse(data.toString());
    }else{
      parsedData=JSON.parse(data);
    }

    if(parsedData.type === "join_room"){
       const user=users.find(x=>x.ws===ws);
       user?.room.push(parsedData.roomId);
    }

    if(parsedData.type === "leave"){
      const user=users.find(x=>x.ws===ws);
      if(!user){
        return;
      }
      user.room=user?.room.filter(x=>x===parsedData.roomId)
    }

  });
});