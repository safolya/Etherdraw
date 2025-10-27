import { useEffect, useRef, useState } from "react";
import { initDraw } from "@/app/draw";
import { Icon } from "./drawicon";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";

export type Tool = "pencil" | "circle" | "rect"

export function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedtool, setSelectedTool] = useState<Tool>("circle")
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        initDraw(canvas, roomId, socket);
    }, [canvasRef])

    return (
        <div className=" h-screen overflow-hidden">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{ border: '1px solid #ccc', display: 'block' }}></canvas>
            <Topbar selectedtool={selectedtool} setSelectedTool={setSelectedTool} />
        </div>
    )
}

function Topbar({ selectedtool, setSelectedTool }: {
    selectedtool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
    return (
        <div>
            <div className="top-0 absolute flex">
                <Icon icon={<Pencil />} onclick={() => { setSelectedTool("pencil") }} activated={selectedtool === "pencil"} />
                <Icon icon={<Circle />} onclick={() => { setSelectedTool("circle") }} activated={selectedtool === "circle"} />
                <Icon icon={<RectangleHorizontalIcon />} onclick={() => { setSelectedTool("rect") }} activated={selectedtool === "rect"} />
            </div>

        </div>
    )
}