const profileRoutes = require("./profile");
const searchRoutes = require("./search");
const homeRoutes = require("./home");
const path = require("path");
const express = require('express');
const loginRoutes = require("./login");


const constructorMethod = app => {

	app.use("/", loginRoutes);
	app.use("/home", (req, res) => {
        
      res.render("pokepick/home");  
    })
	
    



    app.use("*", (req,res) => {
        res.redirect("/");
    })
}

module.exports = constructorMethod;