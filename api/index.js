//* DEPENDENCIES
const express = require("express");
const methodOverride = require("method-override");
const Pokemon = require("../models/pokemon");

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

//*edit route
app.put("/pokemon/:id", (req, res) => {
  const editPokemonIndex = Pokemon.findIndex((e) => e.id === req.params.id);
  Pokemon[editPokemonIndex] = {
    ...Pokemon[editPokemonIndex],
    name: req.body.name,
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
  console.log(Pokemon[editPokemonIndex]);
  res.redirect("/pokemon/");
});

app.get("/pokemon/:id/edit", (req, res) => {
  const pos = req.params.id;
  const pokemon = Pokemon.filter((pokemon) => pokemon.id === pos)[0];
  res.render("edit.ejs", { pokemon, pos });
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});

app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;
