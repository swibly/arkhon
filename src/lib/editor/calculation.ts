import { type Canvas, FabricObject } from 'fabric';

export function canvasCalculation(canvas: Canvas) {
    let finalBudget: number = 0;
    let components: Array<FabricObject> = [];
    let objects: Array<FabricObject> = [];    
    let objectsValues: Array<number> = [];
    let duplicatedComponents = {};
    let canvasObjects;

    duplicatedComponents = {};
    finalBudget = 0;

    canvasObjects = canvas.toObject([
        'name',
        'price',
        'isComponent',
        'isPublic',
        'description',
        'id',
        'arkhoins',
        'material',
        'structureType',
        'owner'
    ]);

    for (const obj of canvasObjects.objects) {
        if (obj.isComponent) {
            finalBudget += obj.price;
            components.push(obj);

            // @ts-ignore
            duplicatedComponents[obj.id] = duplicatedComponents[obj.id]
                ? // @ts-ignore
                  duplicatedComponents[obj.id] + 1
                : 1;
        }

        if (!obj.isComponent && obj.type === 'Rect') {
            let width = (obj.width * obj.scaleX.toFixed(2)) / 100;
            let height = (obj.height * obj.scaleY.toFixed(2)) / 100;
            let area = width * height;
            objects.push(obj);

            switch (obj.material) {
                case 'cimento':
                    area *= 154;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;

                case 'madeira':
                    area *= 125;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;

                case 'azulejo':
                    area *= 105;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;

                case 'cerâmica':
                    area *= 79;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;

                case 'porcelanato':
                    area *= 134;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;
            }
        }

        if (!obj.isComponent && obj.type === 'Circle') {
            let width = (obj.width * obj.scaleX.toFixed(2)) / 100;
            let height = (obj.height * obj.scaleY.toFixed(2)) / 100;
            let area =
                width === height
                    ? 3.14 * Math.sqrt(width / 2)
                    : (((3.14 * width) / 2) * height) / 2;
            objects.push(obj);

            switch (obj.material) {
                case 'cimento':
                    area *= 154;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;

                case 'madeira':
                    area *= 125;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;

                case 'azulejo':
                    area *= 105;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;

                case 'cerâmica':
                    area *= 79;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;

                case 'porcelanato':
                    area *= 134;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;
            }
        }

        if (!obj.isComponent && obj.type === 'Polygon') {
            let points = obj.points;
            let area = 0;
            objects.push(obj);

            for (let i = 0; i < points.length - 1; i++) {
                area += points[i].x * points[i + 1].y - points[i].y * points[i + 1].x;
            }

            area +=
                points[points.length - 1].x * points[0].y -
                points[points.length - 1].y * points[0].x;

            area = area / 2 / 10000;

            switch (obj.material) {
                case 'cimento':
                    area *= 154;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;

                case 'madeira':
                    area *= 125;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;

                case 'azulejo':
                    area *= 105;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;

                case 'cerâmica':
                    area *= 79;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;

                case 'porcelanato':
                    area *= 134;
                    objectsValues.push(area);
                    finalBudget += area;
                    break;
            }
        }
    }

    return {
        budget: finalBudget,
        components: components,
        duplicatedComponents: duplicatedComponents,
        objects: objects,
        objectsValues: objectsValues
    };
}
