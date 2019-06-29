## Demo

https://warm-mesa-83997.herokuapp.com/

## Running local

[Disclaimer] I prefer to use yarn instead of npm, you can use npm if you wish [/Disclaimer]

First, you need to configure the project in the configuration folder, remember to setup the BFF to get the weather responses.

Now, in the project directory, you can run:

### `yarn`
### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn build-serve`

This builds the app for production and serves the build folder.<br>

### `yarn serve`

This only serves the build folder.

## Running Docker

This project contains a Dockerfile to make it productive and, in the next releases, work in any environment without rebuilding.

If you need to run it as Docker, build and run the image:

`docker build -t weather-frontend`

`docker run -p 5000:5000 -it weather-frontend`

## Heroku

This projects contains the heroku yml for it's initialization in heroku, you need to have the heroku CLI (https://devcenter.heroku.com/articles/heroku-cli) installed.

If you have the heroku CLI, then you must create the heroku project

`heroku create`

Set the heroku deployment to container, so we can use the docker image


`heroku stack:set container`

And now, push this repository to heroku

`git push heroku master`

This will start to build and finally run the docker image in Heroku. Remember to use `heroku info` to know the URL of the project.
