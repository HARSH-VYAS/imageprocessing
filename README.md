#Instructions on how to run this project

1. Pleease install all the required npm modules as mentioned in package.json file under dependencies.
2. Common command used for the installation starts with  npm i 'dependecy-name' : for example npm i supertest
3. Once every dependency is installed, I have configured the config files and added the scripts such that you only need to run the following command.
4. npm run start
5. Once the node server starts and you see the message on command line which says "Server started at localhost :3000"
6. Visit https://localhost:3000/image?fileName=fjord&width=200&height=500
7. This will open the resized image fjord. 

#How the resizing woks. 

We have used #sharp node dependcy module to resize the images. 
APIS provided by  sharp are pretty stright forward and easy to use. 

Please look at routes.ts file under src/api/ folder for more information on how its used. 

#How to Test

As mentioned above the build scripts are already added in package.json file so we only need  to run the following command.

npm run test

All the tests are written in indexSpec.ts file under src/tests folder. 


