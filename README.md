# About this project

MoonFlow is a web app built on the MERN stack that provides users with astrological guidance based on their star sign and house, as well as the current moon phase

### API

The Documentation for the API that runs on the express server can be found in [DOCUMENTATION.md](DOCUMENTATION.md)

## Setting up for Development

To set up your system for development please do the following steps:
1. Install [Node](https://nodejs.org/en/)
   - _Note: Ensure you install the additional build tools, one of the later steps in the install process. If you've already installed Node, you can mondify your installation through the Windows Settings Apps and Features "Modify" button_
2. Clone the repository  
   - `git clone git@github.com:6XAM/MVP.git MVP` or `https://github.com/6XAM/MVP.git MVP`  
3. `cd` into the project  
   - `cd MVP`  
4. Install npm packages  
   - `npm install`  
   - _Note: you only need to run this on initial setup to get `concurrently`, which is needed for the `install-all` script_  
5. Install all npm packages (including client)  
6. Copy `config.js` to `server/config/config.js`  
7. Run the desired development script  
   - `npm run-script dev` for express server and react server  
   - `npm run-script client` for react server  
   - `npm run-script server` for express server  


## Deploying to Heroku

To deploy to Heroku please do the following steps:
1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Login to Heroku
   - `heroku login` and follow the prompts
3. From the root of your project, add the Heroku git remote
   - `heroku git:remote a mvp-heaven`
4. Push your code to the Heroku remote
   - `git push heroku master` to push local master to Heroku master
   - `git push heroku development:master` to push local development to Heroku master
5. When it is done deploying, it can be viewed at [https://mvp-heaven.herokuapp.com](https://mvp-heaven.herokuapp.com). If issues occur, you can use `heroku log --tail` to see the console output.


## Available Scripts

Please note that any time the server is run in these scripts `nodemon` is used in place of `node` for easier development. In the project directory, you can run:

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run-script server`

Runs just the server in development mode.<br>


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>


## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!
