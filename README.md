# northcoders-news-BE

A RESTful API for Northcoders News, a news aggregation site. Built using Node.js, Express.js, MongoDB and Mongoose.

To view the API endpoints described below, please follow the instructions in [this link](https://az-northcoders-news-back-end.herokuapp.com/) 

# SetUp

You will need Node.js v7.9.0 or later npm, git and MongoDB v3.2 or later installed before being able to run this project.

To check if Node.js is installed on your machine open a terminal window and enter:

```node -v```

If you do not already have Node.js installed please follow the instructions on [this guide](https://nodejs.org/en/download/package-manager/).

To check if npm is installed on your machine enter this command in you terminal window: 

```npm -v```

If you do not have npm already installed please follow [this guide](https://www.npmjs.com/get-npm) to set it up.

To check if git is installed on your machine please enter the following commitng in your terminal window: 

```git --version```

If you do not already have git installed on your machine please follow [this guide](https://git-scm.com/).

If you do not have MongoDB already installed, please follow [this guide](https://docs.mongodb.com/manual/installation/)

# Installation

To run this project you will need to clone it onto your local machine and install all dependencies.

To do so use the command line to o navigate to your preferred directory on your local machine and enter the following command on the terminal window:

```git clone https://github.com/andreazerio/northcoders-news-BE.git```

Navigate inside the folder and install all dependencies by entering the following command on your terminal window: 

```npm install```

 Enter the following command in your terminal window to connect to the database and keep it running: 

```mongod```

Open another terminal window, navigate inside the project folder and enter the following command to populate the database: 

```node seed/seed.js```

Finally to run the server enter the following command in your terminal window: 

```npm start```

This will run the server on port 5000. All endpoints can be found locally on http://localhost:5000 .

# Testing

To test the api open a terminal window, navigate to the project directory and enter the following command

```npm test```

Testing was carried out using Mocha, Chai and Supertest

# API Endpoints

Please find below the routes available on this API:

1. GET /api/topics

Get all the topics

2. GET /api/topics/:topic/articles

Return all the articles for a certain topic

3. GET /api/articles

Returns all the articles

4. GET /api/articles/:article_id

Get an individual article by id

5. GET /api/articles/:article_id/comments

Get all the comments for a individual article

6. POST /api/articles/:article_id/comments

Add a new comment to an article. This route requires a JSON body with a comment key and value pair 
e.g: {"comment": "This is my new comment"}

7. PUT /api/articles/:article_id

Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down' 


8. PUT /api/comments/:comment_id

Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down' 

9. DELETE /api/comments/:comment_id

Deletes a comment if the comment was created by the Northcoder user

10. GET /api/users/:username

Returns a JSON object with the profile data for the specified user.

# Built With

1. Node.js
2. Express.js
3. MongoDB
4. Mongoose
5. Mocha
6. Chai
7. Supertest

