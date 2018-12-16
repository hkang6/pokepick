const express = require("express");
const router = express.Router();

router.get("/pokemons", (req, res) => {

   
    res.render('pokepick/pokemons');
    
});

module.exports = router;