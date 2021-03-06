const express = require('express');
const router = express.Router();

const flash = require('connect-flash');

const data = require("../data");
const userData  = data.user;



    router.get('/', (req, res) => {
        res.render('pokepick/signup', { error: req.flash('invalid') });
    })

    router.post("/", async(req, res) => {
        let info = req.body;
        try{
            const addUser = await userData.addUser(info);
            res.redirect('/login');
        }catch(error){
            res.status(500).json({error: "Could not add user"});
        }
    })


module.exports = router;
