import { Canvas, FabricObject, Group } from 'fabric';

interface HistoryAction {
    type: 'add' | 'remove' | 'modify' | 'group' | 'ungroup';
    object?: FabricObject;
    group?: Group;
    objects?: FabricObject[];
    prevStates?: Record<string, any>[];
    newStates?: Record<string, any>[];
}

export class HistoryManager {
    private undoStack: HistoryAction[] = [];
    private redoStack: HistoryAction[] = [];
    private canvas: Canvas;
    private isProgrammaticChange = false;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.captureEvents();
    }

    private captureEvents() {
        this.canvas.on('object:modified', (e) => {
            if (!this.isProgrammaticChange) {
                const obj = e.target;
                if (obj) {
                    this.saveAction({
                        type: 'modify',
                        object: obj,
                        prevStates: [{ ...obj.toObject(['id', 'name', 'userlock', 'price', 'priceWall']) }],
                        newStates: [{ ...obj.toObject(['id', 'name', 'userlock', 'price', 'priceWall']) }],
                    });
                }
            }
        });

        this.canvas.on('object:added', (e) => {
            if (!this.isProgrammaticChange) {
                const obj = e.target;
                if (obj) {
                    this.saveAction({ type: 'add', object: obj });
                }
            }
        });

        this.canvas.on('object:removed', (e) => {
            if (!this.isProgrammaticChange) {
                const obj = e.target;
                if (obj) {
                    this.saveAction({ type: 'remove', object: obj });
                }
            }
        });
    }

    private saveAction(action: HistoryAction) {
        this.undoStack.push(action);
        this.redoStack = []; // Clear redo stack on a new action
    }

    undo() {
        const action = this.undoStack.pop();
        if (action) {
            this.isProgrammaticChange = true; // Mark as programmatic
            this.applyReverseAction(action);
            this.redoStack.push(action);
            this.isProgrammaticChange = false; // Reset the flag
        }
    }

    redo() {
        const action = this.redoStack.pop();
        if (action) {
            this.isProgrammaticChange = true; // Mark as programmatic
            this.applyAction(action);
            this.undoStack.push(action);
            this.isProgrammaticChange = false; // Reset the flag
        }
    }

    private applyAction(action: HistoryAction) {
        switch (action.type) {
            case 'add':
                if (action.object) {
                    this.canvas.add(action.object);
                }
                break;
            case 'remove':
                if (action.object) {
                    this.canvas.remove(action.object);
                }
                break;
            case 'modify':
                if (action.object && action.newStates) {
                    action.object.set(action.newStates[0]);
                    action.object.setCoords();
                }
                break;
            case 'group':
                if (action.objects) {
                    const group = new Group(action.objects);
                    this.canvas.add(group);
                    this.canvas.remove(...action.objects);
                }
                break;
            case 'ungroup':
                if (action.group && action.objects) {
                    this.canvas.remove(action.group);
                    action.objects.forEach((obj, i) => {
                        const prevState = action.prevStates ? action.prevStates[i] : {};
                        obj.set(prevState);
                        this.canvas.add(obj);
                    });
                }
                break;
        }
        this.canvas.requestRenderAll();
    }

    private applyReverseAction(action: HistoryAction) {
        switch (action.type) {
            case 'add':
                if (action.object) {
                    this.canvas.remove(action.object);
                }
                break;
            case 'remove':
                if (action.object) {
                    this.canvas.add(action.object);
                }
                break;
            case 'modify':
                if (action.object && action.prevStates) {
                    action.object.set(action.prevStates[0]);
                    action.object.setCoords();
                }
                break;
            case 'group':
                if (action.group && action.objects) {
                    this.canvas.remove(action.group);
                    action.objects.forEach((obj) => this.canvas.add(obj));
                }
                break;
            case 'ungroup':
                if (action.objects) {
                    const group = new Group(action.objects);
                    this.canvas.add(group);
                    this.canvas.remove(...action.objects);
                }
                break;
        }
        this.canvas.requestRenderAll();
    }

    group(objects: FabricObject[]) {
        const prevStates = objects.map((obj) => ({ ...obj.toObject(['id', 'name', 'userlock', 'price', 'priceWall']) }));

        const group = new Group(objects);
        this.canvas.add(group);
        this.canvas.remove(...objects);

        this.saveAction({
            type: 'group',
            group,
            objects,
            prevStates,
        });
    }

    ungroup(group: Group) {
        const objects = group._objects;

        const prevStates = objects.map((obj) => ({ ...obj.toObject(['id', 'name', 'userlock', 'price', 'priceWall']) }));

        this.canvas.remove(group);
        objects.forEach((obj) => {
            obj.left += group.left || 0;
            obj.top += group.top || 0;
            obj.setCoords();
            this.canvas.add(obj);
        });

        this.saveAction({
            type: 'ungroup',
            group,
            objects,
            prevStates,
        });
    }
}
