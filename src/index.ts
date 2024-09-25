import RootPath from 'app-root-path';
import express from 'express';
import path from 'path';
import routes from './api/routes/index';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname,'../assets/thumb')));

app.use('/image',routes);

// Here we will post the output of the file.

app.listen(port,()=>{
    console.log(`Server started at localhost :${port}`);
});

export default app;