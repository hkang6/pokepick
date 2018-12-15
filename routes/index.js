const profileRoutes = require("./profile");
const searchRoutes = require("./search");
const homeRoutes = require("./home");
const path = require("path");
const express = require('express');
const loginRoutes = require("./login");
const signupRoutes = require("./signup")
const findUser = require("./find_user");

const userRoute = require('./user');
const constructorMethod = app => {
    // app.get('/', (req, res) => {
    //     res.send('welcome to pokemonDB');
    // })
    app.use("/", loginRoutes);
    app.use("/findUser",findUser);
    app.use("/signup", signupRoutes);
	app.use("/home", (req, res) => {   
        res.render("pokepick/home");  
    })

    app.use('/user', userRoute);
    app.use("*", (req, res) => {
        res.redirect("/");
    });
};

module.exports = constructorMethod;
