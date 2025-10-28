
import axios from "axios"
import { BACKEND_URL } from "@/config";

type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
}

export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    const context = canvas.getContext("2d");

    let existingShape: Shape[] = await getExistingShape(roomId);

    if (!context) return;

    allShapes(existingShape, canvas, context);

    socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
            console.log("Received data:", parsedData)
            const parsedShape = JSON.parse(parsedData.message);
            existingShape.push(parsedShape.shape);
            allShapes(existingShape, canvas, context);
        }
    }


    let clicked = false;
    let startx = 0;
    let starty = 0;
    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startx = e.clientX;
        starty = e.clientY;
    })

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - startx;
        const height = e.clientY - starty;
        const shape: Shape = {
            type: "rect",
            x: startx,
            y: starty,
            width: width,
            height: height
        }

        existingShape.push(shape);

        socket.send(JSON.stringify({
             type:"chat",
             message:JSON.stringify({
                shape
             }),
             roomId
        }))
    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            console.log("Drawing at ", e.clientX, e.clientY);
            const width = e.clientX - startx;
            const height = e.clientY - starty;
            allShapes(existingShape, canvas, context);
            //@ts-ignore
            const selectedTool=window.selectedtool;
            if(selectedTool==="rect"){
                context.strokeStyle = "white";
                context.strokeRect(startx, starty, width, height);
            }else if(selectedTool==="circle"){
              const centerX=startx+width/2;
              const centerY=starty+height/2;
              const radius=Math.max(width,height)/2;
              context.beginPath();
              context.arc(centerX,centerY,radius,0,Math.PI*2);
              context.stroke();
              context.closePath();
            }
        }
    })

}

function allShapes(existingShape: Shape[], canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    existingShape.map((shape) => {
        if (shape.type === "rect") {
            context.strokeStyle = "white";
            context.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    })
}

async function getExistingShape(roomId: string) {
    const res = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    const chats = res.data.chats;
    const shape = chats.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message);
        return messageData.shape;
    })
    return shape
}