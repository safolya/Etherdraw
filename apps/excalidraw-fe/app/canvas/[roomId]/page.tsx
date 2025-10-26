
import CanvasWs from "@/components/canvasws";

export default async function CanvasRoom({params}:{
    params:{
        roomId:string
    }
}) {
    const roomId=(await params).roomId
    return <CanvasWs roomId={roomId}/>
}