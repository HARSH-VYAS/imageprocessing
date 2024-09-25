import express from 'express';
import sharp from 'sharp';
import path, { resolve } from 'path';
import fs from 'fs';
import RootPath from 'app-root-path';
import handleError from '../../helper/errorhandler'
import { reject } from 'lodash';

const routes = express.Router();

routes.get('/', handleError, (req: express.Request, resp: express.Response): void => {

    const fileName = req.query.fileName;
    const width: number = Number(req.params.width);
    const height: number = Number(req.params.height);
    const existingPath = path.join(RootPath.path, 'src/assets/full/', `${fileName}.jpg`);
    const newFilePath = path.join(RootPath.path, 'src/assets/thumb/', `${fileName}_${width}_${height}.jpg`);

    transform(existingPath, width, height, newFilePath)
        .then(() => {
            checkFileExists(newFilePath)
                .then(
                    () => resp.status(200).sendFile(newFilePath,
                        (err: Error) => {
                            if (err)
                                throw err;
                        }))
                .catch((error) => {
                    throw new Error("Process timed out while checking the file exists" + error);
                });

        }).catch((error) => {
            throw new Error("There was some problem processing the file" + error);
        });

});

export async function transform(fullPath: string, width: number, height: number, thumbpath: string): Promise<void> {

    return new Promise<void>((resolve) => {
        sharp(fullPath)
            .resize(width, height)
            .toFile(thumbpath)
            .catch((error) => {
                throw new Error("Input file is missing inside sharp" + error);
            });
        resolve();
    });
}


function checkFileExists(filePath: string): Promise<void> {
    return new Promise<void>((resolve) => {
        const intervalId = setInterval(
            () => {
                if (fs.existsSync(filePath)) {
                    console.log("New file is created");
                    clearInterval(intervalId);
                    resolve();
                }
            }
            , 1000);
    });
}

export default routes;   