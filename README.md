# MSBD5005-Esports

**Website**:  
https://msbd5005-esports.appspot.com/

**API**:  
https://api-dot-msbd5005-esports.appspot.com/

**Running the client**:  
`cd client/`  
`npm run start` or `yarn start`

To test locally, the default url is http://localhost:8080

**Running the server**:  
`cd server/`  
`npm run start` or `yarn start`

To test locally, the default url is http://localhost:8081

**Deployment**:  
If there are changes to the client code, the static files need to be rebuilt:  
`cd client/`  
`npm run build` or `yarn build`  

Pushing to master will activate the Google Cloud build trigger for deployment:  
`git push origin master`  
This will deploy both the client and server files.