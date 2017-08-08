const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

// this will attach the bodyParser to the pipeline and attach
// the data to the req as JSON
app.use(bodyParser.json());
// this will take the url encoded data and
//only accept the primitive types of data (strings, numbers, NOT arrays, NOT objects)
app.use(bodyParser.urlencoded({ extended: false }));

// define a home page
app.get("/", (request, response) => {
  response.send("Hello person.");
});

// listen on port 3000
app.listen(3000, function() {
  console.log("Successfully accessed RESTful Dinos on port 3000!");
});
