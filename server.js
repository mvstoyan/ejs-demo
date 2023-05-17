require('dotenv').config();
const connectDB = require('./db/connect');
const session = require('express-session');
const express = require('express');
const app = express();
const taskRouter = require('./routes/tasks');
const setMessage = require('./middleware/message');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(express.urlencoded({extended: false}));  // Parse request bodies in URL-encoded format
app.use('/tasks', setMessage, taskRouter);

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  // Define an array of mascots and a tagline to render on the page
  const mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  const tagline = "No programming concept is complete without a cute animal mascot.";

// Render the index template, passing in the mascots and tagline as variables
  res.render('pages/index', {
    mascots: mascots,
    tagline: tagline
  });
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');  // Render the about template
});

const port = 8080; // Start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);   // Connect to the database using the provided URI
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)  // Start listening for requests on the specified port
    );
  } catch (error) {
    console.log(error);
  }
};

start();