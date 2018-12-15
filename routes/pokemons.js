const express = require("express");
const router = express.Router();
const data = require("../data");
const pokemonData = data.pokemons;

// router.get("/new", (req, res) => {
//     res.render("pokemons/new");
// })

router.get("/:id", async (req, res) => {
    // if(!req.params.id) return res.status(400).send('The id is not suitable');
    const pokemon = await pokemonData.getPokemonById(req.params.id);
    res.send(pokemon);
   // res.render("pokemons/single", { pokemon: pokemon });
})

router.get("/name/:name", async (req, res) => {
//    if(!req.params.name) return res.status(400).send('The name is not suitable');
   const pokemon = await pokemonData.getPokemonByName(req.params.name);
   res.render("pokemons/single", { pokemon: pokemon});
})

router.get("/type/:type", (req, res) => {
    pokemonData.getPokemonByType(req.params.type).then(pokemonList => {
        res.send(pokemonList);
        //res.render("pokemons/index", {pokemons: pokemonList});
    })
})

router.get("/", async (req, res) => {

    const pokemonList = await pokemonData.getAllPokemons();
        // res.json(pokemonList);
  // res.render("pokemons/index", {pokemons: pokemonList});
   res.send(pokemonList);
})

router.post("/", async (req, res) => {
    let postPokemonData = req.body;
    let errors = [];

    if(!postPokemonData.id|| typeof(id)!= "number" || id > 493) {
        errors.push("There is not suitable id provided");
    }
    
    if(!postPokemonData.name|| typeof(name)!= "string") {
        errors.push("There is not a suitable name provided");
    }

    if(!postPokemonData.type|| typeof(type)!= "string") {
        errors.push("There is not a suitable type provided");
    }

    if(!postPokemonData.max_atk|| typeof(max_atk)!= "number" || max_atk > 414) {
        errors.push("There is not a suitable max attack provided");
    }

    if(!postPokemonData.max_def|| typeof(max_def)!= "number" || max_def > 396) {
        errors.push("There is not a suitable max defense provided");
    }

    if(!postPokemonData.max_hp|| typeof(max_hp)!= "number" || max_hp > 496) {
        errors.push("There is not a suitable max hp provided");
    }

    if(!postPokemonData.max_cp|| typeof(max_cp)!= "number" || max_cp > 4431) {
        errors.push("There is not a suitable max cp provided");
    }

    // if(errors.length > 0) {
    //     res.render("pokemons/new", {
    //         errors: errors,
    //         hasError: true,
    //         pokemon: postPokemonData
    //     });
    //     return;
    // }

    try {
        const newPokemon = await pokemonData.addPokemon(
            postPokemonData.id,
            postPokemonData.name,
            postPokemonData.type,
            postPokemonData.max_atk,
            postPokemonData.max_def,
            postPokemonData.max_hp,
            postPokemonData.max_cp,
            postPokemonData.comments
        );

        res.redirect(`/pokemons/${newPokemon._id}`);
    } catch(e) {
        res.status(500).json({ error: e});
    }
});

router.put("/:id", (req, res) => {
    let updatedData = req.body;

    let getPokemon = pokemonData.getPokemonById(req.params.id);

    getPokemon.then(() => {
        return pokemonData.addComment(req.params.id, updatedData).then(updatedPokemon => {
            res.json(updatedPokemon);
        }).catch(e => {
            res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Pokemon not found" });
    });
})

router.delete("/:id", (req, res) => {
    let getPokemon = pokemonData.getPokemonById(req.params.id);

    getPokemon.then(() => {
        return pokemonData.removePokemon(req.params.id).then(() => {
            res.status(200);
        }).catch(e => {
            res.status(500).json({ error: e});
        })
    })
    .catch(() => {
        res.status(404).json({error: "There is no such a pokemon"});
    })
})

module.exports = router;