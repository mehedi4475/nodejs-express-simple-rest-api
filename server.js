const express = require('express');
const bodyParser = require('body-parser');

//Create express app
const app = express();

//Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:true }))

//Parser requests of content-type -application/json
app.use(bodyParser.json())


//Configure the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
	console.log("Successfully connected to database");
}).catch(err => {
	console.log("Could not connect to the database. Exisitng now...", err);
	process.exit();
})


//Cross problem solve
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Define home page (/) route
app.get('/', (req, res) => {
	res.json({
		"message": "Welcome to NodeJS and Express REST API"
	})
});


//Require Notes Routes
require('./app/routes/note.routes.js')(app);

//listen for requests
app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});