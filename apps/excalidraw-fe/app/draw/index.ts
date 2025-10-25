
type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
}

export function initDraw(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");

    const existingShape: Shape[] = [];

    if (!context) return;
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);


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
        existingShape.push({
            type: "rect",
            x: startx,
            y: starty,
            width: width,
            height: height
        })
    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            console.log("Drawing at ", e.clientX, e.clientY);
            const width = e.clientX - startx;
            const height = e.clientY - starty;
            allShapes(existingShape, canvas, context);
            context.strokeStyle = "white";
            context.strokeRect(startx, starty, width, height);
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