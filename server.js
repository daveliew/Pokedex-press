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

//* new route
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs");
});

//* show route
app.get("/pokemon/:id", (req, res) => {
  const pos = req.params.id;
  const pokemon = Pokemon.filter((pokemon) => pokemon.id === pos)[0];
  res.render("show.ejs", { pokemon, pos });
});

//*post route

app.post("/pokemon/", (req, res) => {
  const newPokemon = {
    name: req.body.name,
    id: (parseInt(Pokemon[Pokemon.length - 1].id) + 1).toString(),
    img: req.body.img,
    type: req.body.type.split(","),
    stats: {
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      spattack: req.body.spattack,
      spdefense: req.body.spdefense,
      speed: req.body.speed,
    },
  };
  console.log(newPokemon);
  Pokemon.unshift(newPokemon);
  res.redirect("/pokemon");
});

//*delete route
app.delete("/pokemon/:index", (req, res) => {
  const toRemove = Pokemon.findIndex((e) => e.id === req.params.index);
  Pokemon.splice(toRemove, 1);
  res.redirect("/pokemon");
});

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
