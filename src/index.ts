import express, { response } from 'express';
import path from 'path';

import sharp from 'sharp';
import routes from './api/routes';

const app = express();
const port = 3000;

const full_path = path.join(__dirname,'assets/full');
const thumb_path = path.join(__dirname,'assets/thumb');

app.use(express.static(thumb_path));

app.use('/image',routes);

// Here we will post the output of the file.

app.listen(port,()=>{
    console.log(`Server started at localhost :${port}`);
});

export default app;