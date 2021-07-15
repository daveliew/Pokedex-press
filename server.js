//* DEPENDENCIES
const express = require("express");
const methodOverride = require("method-override");
const Pokemon = require("./models/pokemon");

//* CONFIGURATION
require("dotenv").config();

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

//! Routes
//* index route
app.get("/pokemon/", (req, res) => {
  const data = Pokemon;
  res.render("index.ejs", { data });
});

//* show route
app.get("/pokemon/:id", (req, res) => {
  const pos = req.params.id;
  const pokemon = Pokemon.filter((pokemon) => pokemon.id === pos)[0];
  res.render("show.ejs", { pokemon });
});

// app.get("/fruits/new", (req, res) => {
//   res.render("new.ejs");
// });

//*post route

// app.post("/fruits", (req, res) => {
//   if (req.body.readyToEat === "on") {
//     req.body.readyToEat = true;
//   }
//   fruits.push(req.body);
//   res.redirect("/fruits");
// });

// //*delete route
// app.get("/fruits/:id", (req, res) => {
//   const { id } = req.params;
//   const fruit = fruits[id];
//   res.render("show.ejs", { fruit, id });
// });

// app.delete("/fruits/:index", (req, res) => {
//   fruits.splice(req.params.index, 1);
//   res.redirect("/fruits");
// });

// app.put("/fruits/:id", (req, res) => {
//   const { id } = req.params;
//   fruits[id].name = req.body.name;
//   fruits[id].color = req.body.color;
//   fruits[id].readyToEat = req.body.readyToEat === "on";
//   res.redirect("/fruits/");
// });

// //*edit route
// app.get("/fruits/:id/edit", (req, res) => {
//   const { id } = req.params;
//   const fruit = fruits[id];
//   res.render("edit.ejs", { fruit, id });
// });

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
