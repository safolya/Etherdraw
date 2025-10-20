import { WebSocketServer } from "ws";
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



  ws.on('message', function message(data) {
    ws.send("hello")
  });
});