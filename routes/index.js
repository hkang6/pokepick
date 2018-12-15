const express = require('express');
const router = express.Router();
const pokemonRoutes = require("./pokemons");
const path = require("path");

const constructorMethod = app => {
    app.use("/pokemons", pokemonRoutes);
    app.get("/about", (req, res) => {
        res.sendFile(path.resolve("static/about.html"));
    })

    app.use("*", (req, res) => {
        res.redirect("/pokemons");
    })
}

module.exports = constructorMethod;
