import { spawn } from '$lib/toast';
import { Point, type Canvas } from 'fabric';

export function savePNG(
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

export function saveJPEG(
    canvas: Canvas,
    width: number,
    height: number,
    viewportWidth: number,
    viewportHeight: number
) {
    canvas.absolutePan(new Point(0, 0));
    canvas.setZoom(1);

    let dataURL = canvas.toDataURL({
        multiplier: 1,
        quality: 1,
        format: 'jpeg',
        top: 0,
        left: 0,
        width: width,
        height: height
    });

    canvas.viewportTransform[4] = viewportWidth;
    canvas.viewportTransform[5] = viewportHeight;

    const link = document.createElement('a');
    link.download = 'canvas.jpg';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    spawn({
        message: 'Imagem salva!'
    });
}

export function saveSVG(canvas: Canvas) {
    canvas.absolutePan(new Point(0, 0));

    let svg = canvas.toSVG();

    const textArea = document.createElement('textarea');
    textArea.value = svg;

    document.body.appendChild(textArea);
    textArea.select();
    navigator.clipboard.writeText(textArea.value);
    document.body.removeChild(textArea);

    spawn({
        message: 'SVG copiado para a área de transferência.'
    });
}
