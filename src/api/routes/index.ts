import express from 'express';
import sharp from 'sharp';
import path, { resolve } from 'path';
import fs from 'fs';

const routes = express.Router();
const full_path = path.join('../../','./assets/full/');
const thumb_path = path.join('../../','./assets/thumb/');


routes.get('/', (req, resp)=>
{
    let fileName = req.query.fileName;
    let width:number = Number(req.query.width);
    let height:number = Number(req.query.height);
    const newFilePath = path.join(__dirname, thumb_path,`${fileName}.jpg`);
  
    sharp(path.join(__dirname, full_path ,`${fileName}.jpg`))
        .resize(width,height)
        .toFile(newFilePath,
        (err:Error): void=>
        {
            if(err)
                console.log('error is : '+ err);
        });
 
    checkFileExists(newFilePath)
    .then(
        ()=>resp.sendFile(newFilePath,
        (err)=>{
            if(err)
                console.log("Error processing the files : " + err);
        }));
        
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

export default routes;       