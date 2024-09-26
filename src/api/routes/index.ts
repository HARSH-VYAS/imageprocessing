import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import handleError from '../../helper/errorhandler';

const routes = express.Router();

routes.get('/', handleError, (req: express.Request, resp: express.Response): void => {

    const fileName = req.query.fileName;
    const width: number = Number(req.params.width);
    const height: number = Number(req.params.height);
    const existingPath = path.join(__dirname, '../../../assets/full/', `${fileName}.jpg`);
    const newFilePath = path.join(__dirname, '../../../assets/thumb/', `${fileName}_${width}_${height}.jpg`);

    fs.access(newFilePath
        , fs.constants.F_OK,
        (err) => {
            if (!err) {
                resp.status(200).sendFile(newFilePath); // File exists and is accessible
            }
            else {
                transform(existingPath, width, height, newFilePath)
                    .then(() => {
                        checkFileAccessTillCreation(newFilePath)
                            .then(
                                (exist) => {
                                    if (exist) {
                                        resp.status(200).sendFile(newFilePath,
                                            (err: Error) => {
                                                if (err)
                                                    throw err;
                                            });
                                    }
                                })
                            .catch((error) => {
                                throw new Error("Process timed out while checking the file exists" + error);
                            });

                    })
                    .catch((reject) => {
                        reject(new Error("There was some problem processing the file"));
                    });

            }
        });

});

export async function transform(fullPath: string, width: number, height: number, thumbpath: string): Promise<void> {

    return new Promise<void>(
        (resolve, reject) => {
            sharp(fullPath)
                .resize(width, height)
                .toFile(thumbpath)
                .then(() => { resolve(); })
                .catch((error) => 
                {
                    reject(error);
                });
        });
}


function checkFileAccessTillCreation(filePath: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        const intervalId = setInterval(
            () => {
                fs.access(filePath, fs.constants.F_OK, (err) => {
                    if (err) {
                        resolve(false); // File does not exist or is inaccessible
                    } else {
                        clearInterval(intervalId);
                        console.log("New file is created");
                        resolve(true); // File exists and is accessible
                    }
                });
            }
            , 1000);
    });
}

export default routes;   