import { Point, type Canvas } from 'fabric';

export function centerView(canvas: Canvas, width: number, height: number): void {
    canvas.setZoom(1);

    canvas.absolutePan(
        new Point(-canvas.width / 2 + width / 2 + 200, -canvas.height / 2 + height / 2)
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
    draw(canvas, true);
}

export function stopDraw(canvas: Canvas): void {
    draw(canvas, false);
}
