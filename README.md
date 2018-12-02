# MSBD5005-Esports

**Website**:  
https://msbd5005-esports.appspot.com/

**API**:  
https://api-dot-msbd5005-esports.appspot.com/

**Setup**
Make sure node.js is up to date, then run
`npm install`

**Running the client**:  
`cd client/`  
`npm run start` or `yarn start`

To test locally, the default url is http://localhost:8080

**Running the server**:  
Run the database proxy to connect to the Cloud SQL:  
`./cloud_sql_proxy -instances=msbd5005-esports:asia-east2:msbd5005-esports-db=tcp:3306`

Run the server:
`cd server/`  
`npm run dev-start` or `yarn dev-start`

To test locally, the default url is http://localhost:8081

**Deployment**:  
Pushing to master will activate the Google Cloud build trigger for deployment:  
`git push origin master`  
This will deploy the client files if there are changes in the client folder,
and also the server files if there are changes in the server folder.
