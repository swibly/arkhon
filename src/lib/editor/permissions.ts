import { Canvas, FabricObject } from 'fabric';

type PermissionOptions = Partial<{
    selectable: boolean;
    bordered: boolean;
    cursor: string;
}>;

export function applyObjectPermissions(
    canvas: Canvas,
    object: FabricObject,
    options?: PermissionOptions
) {
    canvas.defaultCursor = options?.cursor ?? 'default';

    canvas.setCursor(canvas.defaultCursor);

    object.lockMovementX = !(options?.selectable ?? false);
    object.lockMovementY = !(options?.selectable ?? false);
    object.lockRotation = !(options?.selectable ?? false);
    object.lockScalingX = !(options?.selectable ?? false);
    object.lockScalingY = !(options?.selectable ?? false);
    object.lockSkewingX = !(options?.selectable ?? false);
    object.lockSkewingY = !(options?.selectable ?? false);
    object.lockScalingFlip = !(options?.selectable ?? false);
    object.hasControls = options?.selectable ?? false;
    object.hasBorders = options?.bordered ?? object.hasControls;
    object.hoverCursor = !(options?.selectable ?? false) ? canvas.defaultCursor : null;
}

export function applyCanvasPermission(canvas: Canvas, options?: PermissionOptions) {
    canvas.discardActiveObject();

    canvas.selection = options?.selectable ?? false;
    canvas.isDrawingMode = false;

    for (const object of canvas.getObjects()) {
        if (object.selectable === false && object.evented === false) continue;
        applyObjectPermissions(canvas, object, options);
    }
}
