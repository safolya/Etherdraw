"use client";

import { useEffect, useRef } from "react";
import { initDraw } from "@/app/draw";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        initDraw(canvas);
    }, [canvasRef])

    return (
        <div className="w-full h-full">
            <canvas ref={canvasRef} width={2000} height={1000} style={{ border: '1px solid #ccc', backgroundColor: 'white', display: 'block', margin: '0 auto' }}></canvas>
        </div>

    )
}