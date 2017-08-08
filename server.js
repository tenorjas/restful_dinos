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

let allDinos = [
  {
    id: 1,
    name: "Tyrannosaurus rex",
    color: "grey",
    weight: "8 tons",
    habitats: ["plain", "forest"]
  },
  {
    id: 2,
    name: "Velociraptor",
    color: "brown",
    weight: "250 lbs",
    habitats: ["jungle", "forest"]
  },
  {
    id: 3,
    name: "Brachiosaurus",
    color: "brown",
    weight: "80 tons",
    habitats: ["plain", "forest"]
  },
  {
    id: 4,
    name: "Triceratops",
    color: "brown",
    weight: "15 tons",
    habitats: ["plain", "forest"]
  }
];

// Creating an endpoint for my API
// this endpoint is where the back end
// meets the front end
// the front can see this url (/api/robot)
// the front can see the return data as JSON
app.get("/api/dinosaurs", (request, response) => {
  response.json(allDinos);
});

app.get("/api/dinosaurs/:id", (request, response) => {
  const dinoId = parseInt(request.params.id);
  // go to my database
  const myDino = allDinos.find(dino => {
    return dino.id === dinoId;
  });
  // this is how we retrun JSON from an endpoint
  response.json(myDino);
});

// listen on port 3000
app.listen(3000, function() {
  console.log("Successfully accessed RESTful Dinos on port 3000!");
});
