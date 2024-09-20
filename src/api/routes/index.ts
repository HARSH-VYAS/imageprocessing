import express from 'express';
import sharp from 'sharp';
import path, { resolve } from 'path';
import fs from 'fs';
import RootPath from 'app-root-path';
import { errorMonitor } from 'events';
import { isEmpty } from 'lodash';
import { ParsedQs } from 'qs';

const routes = express.Router();
const full_path = 'src/assets/full/';
const thumb_path ='src/assets/thumb/';

routes.get('/', (req, resp)=>
{
    let rootPath = RootPath.path;
    try
    {

    let fileName = req.query.fileName;
    let fullPath = (path.join(rootPath, full_path,`${fileName}.jpg`));
    
    if(!fs.existsSync(fullPath))
    {
        throw new Error("File path does not exist" + fullPath);
    }

    let width:number = getWidth(req.query.width);
    let height:number = getHeight(req.query.height);
    const newFilePath = path.join(rootPath, thumb_path,`${fileName}_${width}_${height}.jpg`);

    sharp(path.join(rootPath, full_path ,`${fileName}.jpg`))
        .resize(width,height)
        .toFile(newFilePath,
        (error:Error): void=>
        {
            if(error)
              throw error; 
           
        });

    checkFileExists(newFilePath)
    .then(
        ()=>resp.status(200).sendFile(newFilePath,
        (err:Error)=>{
            if(err)
                throw err;
        }));
    }
    catch(error)
    {
      throw error;
    }
        
});

function checkFileExists(filePath:string)
{
    return new Promise<void>((resolve)=>{
        const intervalId = setInterval(
            ()=>{
                if(fs.existsSync(filePath))
                {
                    console.log("Now file is created");
                    clearInterval(intervalId);
                    resolve();
                }

            },1000
        )
    });
}


function getWidth(width: string | ParsedQs | string[] | ParsedQs[] | undefined)
{
    try{
        if(isEmpty(width))
            throw new Error("Please provide a valid positve number for width request parameter");

        if(isNaN(Number(width)))
            throw new Error("Width is not a number");
            
        return Number(width);
    }
    catch(err)
    {
        throw err;
    }
}


function getHeight(height: string | ParsedQs | string[] | ParsedQs[] | undefined)
{
    try{
        if(isEmpty(height))
            throw new Error("Please provide a valid positve number for Height request parameter");

        if(isNaN(Number(height)))
            throw new Error("Height is not a number");
            
        return Number(height);
    }
    catch(err)
    {
        throw err;
    }
}

export default routes;       