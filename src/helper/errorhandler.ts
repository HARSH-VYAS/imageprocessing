import express from 'express';
import path from 'path';
import fs from 'fs';
import RootPath from 'app-root-path';
import { isEmpty } from 'lodash';
import { ParsedQs } from 'qs';

const handleError = (req: express.Request, resp: express.Response, next: Function): void => {

    const fileName = req.query.fileName;
    const width: number = getWidth(req.query.width);
    const height: number = getHeight(req.query.height);
    const existingPath = path.join(__dirname , '../../assets/full/', `${fileName}.jpg`);

    if (isEmpty(fileName)) {
        throw new Error("FileName can not be empty");
    }
    if (!fs.existsSync(existingPath)) {
        throw new Error("File path does not exist" + existingPath);
    }
    req.params.width = String(width);
    req.params.height = String(height);

    next();
};

function getWidth(width: string | ParsedQs | string[] | ParsedQs[] | undefined): number {

    if (isEmpty(width))
        throw new Error("Please provide a valid positve number for width request parameter");

    if (isNaN(Number(width)))
        throw new Error("Width is not a number");

    const num = Number(width);
    if (num < 0)
        throw new Error("Width must be a posive number");
    if (num == 0)
        throw new Error("Width can not be 0 ");

    return num;

}


function getHeight(height: string | ParsedQs | string[] | ParsedQs[] | undefined): number {

    if (isEmpty(height))
        throw new Error("Please provide a valid positve number for Height request parameter");

    if (isNaN(Number(height)))
        throw new Error("Height is not a number");

    const num = Number(height);
    if (num < 0)
        throw new Error("Height must be a posive number");
    if (num == 0)
        throw new Error("Height can not be 0 ");

    return num;
}

export default handleError;