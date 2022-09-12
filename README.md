# Aspire App

## Getting Started
Make sure you have [node](https://nodejs.org/en/) version 16.17.0 installed.

In the root of this repoistory run ```npm install``` to install nessacary dependencies.


```backend``` contains an [ExpressJS](https://expressjs.com/en/5x/api.html) web server, it can be run in with ```npm run backend-dev```

```frontend``` contains a [React App](https://reactjs.org/blog/2022/03/29/react-v18.html), it can be run with ```npm run react-dev```

Both can be launched simultaneously with: ```npm run dev```

After launching navigate to [http://localhost:3000](http://localhost:3000)

## Installing packages

If you need to install packages to either the frontend or the backend,

 - add ```--workspace=frontend``` for frontend modules
 - add ```--workspace=backend``` for backend modules
 - for example: ```npm install express --workspace=backend```