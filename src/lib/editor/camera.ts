import { Canvas, FabricObject, Point, util } from 'fabric';

export function centerView(
    canvas: Canvas,
    project: { width: number; height: number },
    duration: number = 500
) {
    const currentZoom = canvas.getZoom();
    const targetZoom = 1;

    const viewWidth = canvas.width / targetZoom;
    const viewHeight = canvas.height / targetZoom;

    const targetX = (project.width * 100) / 2 - viewWidth / 2;
    const targetY = (project.height * 100) / 2 - viewHeight / 2;

    const currentTransform = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
    const currentX = -currentTransform[4];
    const currentY = -currentTransform[5];

    util.animate({
        startValue: 0,
        endValue: 1,
        duration,
        easing: util.ease.easeInOutCubic,
        onChange: (value: number) => {
            const interpolatedZoom = currentZoom + (targetZoom - currentZoom) * value;

            canvas.setZoom(interpolatedZoom);

            const interpolatedX = currentX + (targetX - currentX) * value;
            const interpolatedY = currentY + (targetY - currentY) * value;

            canvas.absolutePan(new Point(interpolatedX, interpolatedY));
        },
        onComplete: () => {
            canvas.setZoom(targetZoom);
            canvas.absolutePan(new Point(targetX, targetY));
        }
    });
}

export function centerViewOnObject(canvas: Canvas, object: FabricObject, duration: number = 500) {
    const currentZoom = canvas.getZoom();
    const targetZoom = 1;

    const boundingRect = object.getBoundingRect();

    const vpw = canvas.width / targetZoom;
    const vph = canvas.height / targetZoom;

    const objectCenterX = (boundingRect.left + boundingRect.width / 2) * targetZoom;
    const objectCenterY = (boundingRect.top + boundingRect.height / 2) * targetZoom;

    const targetX = objectCenterX - vpw / 2;
    const targetY = objectCenterY - vph / 2;

    const currentTransform = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
    const currentX = -currentTransform[4];
    const currentY = -currentTransform[5];

    util.animate({
        startValue: 0,
        endValue: 1,
        duration,
        easing: util.ease.easeInOutCubic,
        onChange: (value: number) => {
            const interpolatedZoom = currentZoom + (targetZoom - currentZoom) * value;

            canvas.setZoom(interpolatedZoom);

            const interpolatedX = currentX + (targetX - currentX) * value;
            const interpolatedY = currentY + (targetY - currentY) * value;

            canvas.absolutePan(new Point(interpolatedX, interpolatedY));
        },
        onComplete: () => {
            canvas.setZoom(targetZoom);
            canvas.absolutePan(new Point(targetX, targetY));
        }
    });
}

export function setZoomLevel(canvas: Canvas, amount: number, duration: number = 500) {
    const currentZoom = canvas.getZoom();
    let targetZoom = amount;

    if (targetZoom >= 3) {
        targetZoom = 3;
    }

    if (targetZoom <= 0.1) {
        targetZoom = 0.1;
    }

    const x = canvas.width / 2;
    const y = canvas.height / 2;

    util.animate({
        startValue: 0,
        endValue: 1,
        duration,
        easing: util.ease.easeInOutCubic,
        onChange: (value: number) => {
            const interpolatedZoom = currentZoom + (targetZoom - currentZoom) * value;

            canvas.zoomToPoint(new Point({ x, y }), interpolatedZoom);
            canvas.renderAll();
        },
        onComplete: () => {
            canvas.setZoom(targetZoom);
            canvas.renderAll();
        }
    });
}
