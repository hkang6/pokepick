const profileRoutes = require("./profile");
const searchRoutes = require("./search");
const homeRoutes = require("./home");
const path = require("path");
const express = require('express');


const constructorMethod = app => {

    app.use("*", (req, res) => {
        res.render("pokepick/home");
    })
}

module.exports = constructorMethod;