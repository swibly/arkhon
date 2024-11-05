import { PencilBrush, Point, Path, type Canvas, type FabricObject } from 'fabric';
import { add } from './objects';

export function centerView(canvas: Canvas, width: number, height: number): void {
    if (innerWidth < 1280) {
        canvas.setZoom(0.4);
        canvas.absolutePan(new Point(0, 0));
    } else {
        canvas.setZoom(0.7);
        canvas.absolutePan(
            new Point(-canvas.width / 2 + width / 2, -canvas.height / 2 + height / 2)
        );
    }
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

export function resize(canvas: Canvas, width: number, height: number, isAllowed: boolean) {
    if (width >= 1536) {
        canvas.setDimensions({
            width: isAllowed ? width - 290 : width,
            height: height - 90
        });
    } else if (width >= 1280) {
        canvas.setDimensions({
            width: isAllowed ? width - 256 : width,
            height: height - 90
        });
    } else {
        canvas.setDimensions({
            width: width,
            height: height - 90
        });
    }
}

export function loadCanvas(canvas: Canvas, json: object) {
    canvas.loadFromJSON(json);
}

export function toPNG(
    canvas: Canvas,
    width: number,
    height: number,
    viewportWidth: number,
    viewportHeight: number
) {
    canvas.absolutePan(new Point(0, 0));

    let dataURL = canvas.toDataURL({
        multiplier: 1,
        format: 'png',
        top: 0,
        left: 0,
        width: width - (width / 3 - 100),
        height: height - (height / 3 - 100)
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

export function toJPEG(
    canvas: Canvas,
    width: number,
    height: number,
    viewportWidth: number,
    viewportHeight: number
) {
    canvas.absolutePan(new Point(0, 0));

    let dataURL = canvas.toDataURL({
        multiplier: 1,
        quality: 1,
        format: 'jpeg',
        top: 0,
        left: 0,
        width: width - (width / 3 - 100),
        height: height - (height / 3 - 100)
    });

    canvas.viewportTransform[4] = viewportWidth;
    canvas.viewportTransform[5] = viewportHeight;

    const link = document.createElement('a');
    link.download = 'canvas.jpg';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function toSVG(canvas: Canvas) {
    canvas.absolutePan(new Point(0, 0));

    let svg = canvas.toSVG();

    const textArea = document.createElement('textarea');
    textArea.value = svg;

    document.body.appendChild(textArea);
    textArea.select();
    navigator.clipboard.writeText(textArea.value);
    document.body.removeChild(textArea);
}
