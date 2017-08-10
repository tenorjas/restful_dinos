const express = require("express");
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");

const app = express();

app.use(express.static("public"));

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

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
    photo:
      "https://thumb1.shutterstock.com/display_pic_with_logo/3076664/509463667/stock-photo-tyrannosaurus-rex-isolated-in-white-509463667.jpg",
    color: "grey",
    weight: "8 tons",
    habitats: ["plain", "forest"]
  },
  {
    id: 2,
    name: "Velociraptor",
    photo: "http://images.dinosaurpictures.org/velociraptor_12_c4fd.jpg",
    color: "brown",
    weight: "250 lbs",
    habitats: ["jungle", "forest"]
  },
  {
    id: 3,
    name: "Brachiosaurus",
    photo: "http://images.dinosaurpictures.org/papo_brachiosaurus_2012_cf3f.jpg",
    color: "brown",
    weight: "80 tons",
    habitats: ["plain", "forest"]
  },
  {
    id: 4,
    name: "Triceratops",
    photo: "http://images.dinosaurpictures.org/triceratops-roger-hall-and-photo-researchers_1b1e.jpg",
    color: "brown",
    weight: "15 tons",
    habitats: ["plain", "forest"]
  },
  {
    id: 5,
    name: "Brontosaurus",
    photo:
      "https://1.bp.blogspot.com/-EK34dcMTRjs/VvWmiymB8wI/AAAAAAAAAc0/9jFuTxWXt4gZtkWM79N6rXAhQFN2wSyEg/s1600/brontosaurus.jpg",
    color: "grey",
    weight: "60 tons",
    habitats: ["plain", "forest"]
  }
];

// Define a home page that displays all the dinosaurs' names and photos
app.get("/", (request, response) => {
  response.render("dinos", { allDinos: allDinos });
});

app.get("/details/:id", (request, response) => {
  let dinoId = parseInt(request.params.id);
  let dino = allDinos.find(function(dinosaur) {
    return dinosaur.id === dinoId;
  });
  response.render("details", { name: dino.name, photo: dino.photo, weight: dino.weight, habitats: dino.habitats });
});

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
  // this is how we return JSON from an endpoint
  response.json(myDino);
});

app.get("/api/dinosaurs/:id/habitats", (request, response) => {
  const dinoId = parseInt(request.params.id);
  // go to my database
  const myDino = allDinos.find(dino => {
    return dino.id === dinoId;
  });
  // this is how we return JSON from an endpoint
  response.json(myDino.habitats);
});

// Add a new dinosaur through the website
app.post("/api/dinosaurs", (request, response) => {
  let newDino = {
    id: allDinos.length + 1, // note: the new id will be handled by the database
    name: request.body.name,
    photo: request.body.photo,
    color: request.body.color,
    weight: request.body.weight,
    habitats: request.body.habitats.split(",")
  };
  // add to our "database"
  allDinos.push(newDino);
  // redirect to the home page
  response.redirect("/");
});

// Update a dinosaur
app.put("/api/dinosaurs/:id", (request, response) => {
  // get the id from the request
  const dinoId = parseInt(request.params.id);
  // change its values
  const myDino = allDinos.find(dino => {
    return dino.id === dinoId;
  });
  myDino.name = request.body.name;
  myDino.color = request.body.color;
  myDino.weight = request.body.weight;
  myDino.habitats = request.body.habitats;
  // send it back to the database
  response.json(myDino);
});

// Delete a dinosaur
app.delete("/api/dinosaurs/:id", (request, response) => {
  // get the id from the request
  const dinoId = parseInt(request.params.id);
  // delete the dinosaur from the "database"
  allDinos = allDinos.filter(dino => dino.id !== dinoId);
  // return all dinosaurs
  response.json(allDinos);
});

// listen on port 3000
app.listen(3000, function() {
  console.log("Successfully accessed RESTful Dinos on port 3000!");
});
