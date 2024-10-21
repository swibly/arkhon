import { PencilBrush, Point, Path, type Canvas } from 'fabric';
import { add } from './objects';

export function centerView(canvas: Canvas, width: number, height: number): void {
    canvas.setZoom(1);

    canvas.absolutePan(
        new Point(-canvas.width / 2 + width / 2, -canvas.height / 2 + height / 2)
    );
}

export function renderAll(canvas: Canvas): void {
    canvas.renderAll();
}

function draw(canvas: Canvas, value: boolean): void {
    canvas.isDrawingMode = value;
    renderAll(canvas);
}

export function startDraw(canvas: Canvas): void {
    canvas.freeDrawingBrush = new PencilBrush(canvas);

    canvas.freeDrawingBrush.color = 'red';
    canvas.freeDrawingBrush.width = 12;

    draw(canvas, true);
}

export function stopDraw(canvas: Canvas): void {
    draw(canvas, false);
}

export function drawGrid(canvas: Canvas, grid: number, width: number, height: number) {
    const gridPath = [];

    for (let i = 0; i <= Math.round(width) / grid; i++) {
        const x = Math.round(i * grid);
        gridPath.push(`M ${x} 0 L ${x} ${Math.round(height)}`);
    }

    for (let i = 0; i <= Math.round(height) / grid; i++) {
        const y = Math.round(i * grid);
        gridPath.push(`M 0 ${y} L ${Math.round(width)} ${y}`);
    }

    const path = new Path(gridPath.join(' '), {
        fill: '',
        stroke: '#A3A3A3',
        strokeWidth: 2,
        strokeUniform: true,
        selectable: false,
        evented: false,
        objectCaching: false
    });

    add(canvas, path);
    path.setCoords();
    canvas.moveObjectTo(path, 0);
    path.excludeFromExport = true;
}

export function resize(canvas: Canvas, width: number, height: number) {
    if (width >= 1536) {
        canvas.setDimensions({
            width: width - width / 5,
            height: height - (height / 100) * 5.5
        });
    } else if (width >= 1280) {
        canvas.setDimensions({
            width: width - width / 4,
            height: height - (height / 100) * 5.5
        });
    } else {
        canvas.setDimensions({
            width: width,
            height: height - (height / 100) * 5.5
        });
    }
}

export function saveCanvas(canvas: Canvas) {
    localStorage.setItem('canvasValue', JSON.stringify(canvas));
}

export function loadCanvas(canvas: Canvas) {
    let json = localStorage.getItem('canvasValue');

    if (typeof json === 'string') {
        let objects = JSON.parse(json);
        return canvas.loadFromJSON(objects);
    }
}

export function toPNG(canvas: Canvas, width: number, height: number, viewportWidth: number, viewportHeight: number) {
    centerView(canvas, width, height);

    let dataURL = canvas.toDataURL({
        multiplier: 1,
        format: 'png',     
        top: -height / 2,
        left: -width / 2, 
        width: width,
        height: height
    });    

    canvas.viewportTransform[4] = viewportWidth;
    canvas.viewportTransform[5] = viewportHeight;

    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
