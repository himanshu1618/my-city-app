# sails-react-app

a [Sails v1](https://sailsjs.com) application

### To Run the application on Development Mode.
1. Install Docker https://www.docker.com/community-edition#/download
2. Run these commands:
```
docker-compose build
docker-compose up

Or: (docker-compose build && docker-compose up)
```
3. Open your web browser to http://localhost:3000/
4. If a login page is presented then use below credentials to login -
   - username: test
   - password: test
5. Or you can create new user by navigating to signup page.

### Features

1. It have MySQL database and the docker initialize the db using sql schema defined in `mysql-schema` directory.
2. It have a Node.js (Sails.js) backend which provides a RESTful interface to interact with this data (CRUD).
3. It also have a React.js frontend that displays a table with following columns
**city**, **start date**, **end date**, **price**, **status**, **color**.
Except city & status all other columns are sortable. The data is fetched from the backend using pagination api.
1. Above the grid we have two date pickers to filter the data with specified data range.

### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
