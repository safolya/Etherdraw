import { useEffect,useRef } from "react";
import { initDraw } from "@/app/draw";


export function Canvas({roomId,socket}:{roomId:string,socket:WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        initDraw(canvas,roomId,socket);
    }, [canvasRef])

    return (
        <div className="w-full h-full">
            <canvas ref={canvasRef} width={2000} height={1000} style={{ border: '1px solid #ccc', backgroundColor: 'white', display: 'block', margin: '0 auto' }}></canvas>
        </div>

    )
}