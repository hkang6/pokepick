const mongoCollection = require("../dbConfig/mongoCollection");
const pokemons = mongoCollection.pokemons;
const uuid = require("node-uuid");


let exportedMethods = {
    // async getAllpokemon() {
    //     const pokemonCollection = await pokemons();
    //     let getAll = await pokemonCollection.find({}).toArray();
    //     return getAll
    // },
    getAllPokemons() {
        return pokemons().then(pokemonCollection => {
            let pokelist = pokemonCollection.find({}).toArray();
            return pokelist;
        })
    },
    // async getPokemonById(id) {
    //     if(!id) {
    //         throw "The id is not correct, Please enter a correct id";
    //     }
    //     const pokemonCollection = await pokemons();
    //     let getById = pokemonCollection.findOne({_id : id });
    //     if(getById === null) {
    //         throw "The pokemon is not existed with this id"
    //     }
    //     return getById;
    // },
    getPokemonById(id) {
        return pokemons().then(pokemonCollection => {
            return pokemonCollection.findOne({_id : id }).then(pokemon => {
                if(!pokemon) throw "There isn't this pokemon";
                return pokemon;
            })
        })                      
    },
    // async getPokemonByName(name) {
    //     if(!name) {
    //         throw "The name is not correct, Please enter a correct name"
    //     }
    //     const pokemonCollection = await pokemons();
    //     let getByName = pokemonCollection.findOne({name : name });
    //     if(getByName === null) {
    //         throw "The pokemon is not existed with this name"
    //     }
    //     return getByName;
    // },
    getPokemonByName(name) {
        return pokemons().then(pokemonCollection => {
            return pokemonCollection.findOne({name : name }).then(pokemon => {
                if(!pokemon) throw "There isn't this pokemon";
                return pokemon;
            })
        })
    },
    // async getPokemonByType(type) {
    //     if(!type) {
    //         throw "The type is not correct, Please enter a correct type"
    //     }
    //     const pokemonCollection = await pokemons();
    //     let getByType = pokemonCollection.find({type : type }).toArray();
    //     if(getByType === null) {
    //         throw "The pokemons are not existed with this type"
    //     }
    //     return getByType;
    // },
    getPokemonByType(type) {
        return pokemons().then(pokemonCollection => {
            return pokemonCollection.find({type : type }).toArray().then(pokemon => {
                if(!pokemon) throw "There isn't this kind of pokemon";
                return pokemon;
            })
        })
    },
    // async addPokemon(id, name, type, max_atk, max_def, max_hp, max_cp) {
    //     if(!id || id.length === 0) {
    //         throw "Please enter the correct id";
    //     }

    //     if(!name || name.length === 0) {
    //         throw "Please enter the correct name";
    //     }

    //     if(!type || type.length === 0) {
    //         throw "Please enter the correct type";
    //     }

    //     if(!max_atk || max_atk.length === 0) {
    //         throw "Please enter the correct max_atk";
    //     }

    //     if(!max_def || max_def.length === 0) {
    //         throw "Please enter the correct max_def";
    //     }

    //     if(!max_hp || max_hp.length === 0) {
    //         throw "Please enter the correct max_hp";
    //     }

    //     if(!max_cp || max_cp.length === 0) {
    //         throw "Please enter the correct max_cp";
    //     }

    //     let newPokemon = {
    //         _id: id, 
    //         name: name,
    //         type: type,
    //         max_atk: max_atk,
    //         max_def: max_def,
    //         max_hp: max_hp,
    //         max_cp: max_cp,
    //         comments: [],
    //         completed: false,
    //         completedAt: null
    //     }
    //     const pokemonCollection = await pokemons();
    //     let add = await pokemonCollection.insertOne(newPokemon);
    //     if(add.insertedCount === 0) {
    //         throw "Crating the pokemon is not successful";
    //     }

    //     const newId = add.insertedId;
    //     let act = await this.getPokemonById(newId);
    //     return act;

    // },
    addPokemon(id, name, type, max_atk, max_def, max_hp, max_cp, comments) {
        return pokemons().then(pokemonCollection => {
            let newPokemon = {
                _id: id, 
                name: name,
                type: type,
                max_atk: max_atk,
                max_def: max_def,
                max_hp: max_hp,
                max_cp: max_cp,
                comments: comments
            }
            return pokemonCollection.insertOne(newPokemon).then(newInsertInformation => {
                return newInsertInformation.insertedId;
            }).then(newId => {
                return this.getPokemonById(newId);
            })
        })
    },
    // async removePokemon(id) {
    //     if(!id) {
    //         throw "Please enter a correct id for removing"
    //     }
    //     const pokemonCollection = await pokemons();
    //     let deletion = await pokemonCollection.removeOne({_id: id});
    //     if(deletion.deleteCount === 0) {
    //         throw `Deleting the pokemon with ${id} is not successful`;
    //     }
    //     return `${id} removed successfully`;
    // },
    removePokemon(id) {
        return pokemons().then(pokemonCollection => {
            return pokemonCollection.removeOne({_id: id}).then(deleteInfo => {
                if(deleteInfo.deleteCount === 0) {
                    throw `The id of ${id} could not be deleted`;
                } else {
                }
            })
        })
    },
    // async addcomment(id, updatePokemon) {
    //     if(!id) {
    //         throw "You should enter a correct id";
    //     }
    //     const pokemonCollection = await pokemons();
    //     let pokemonobject = await pokemonCollection.findOne({_id : id});
    //     if(pokemonobject === null) {
    //         throw "no such pokemon";
    //     }

    //     let updatePokemonData = {};

    //     if(updatePokemon.comments) {
    //         updatePokemonData.comments =  updatePokemon.comments;
    //     }

    //     let updateCommand = {
    //         $set: updatePokemonData
    //     };
    //     const update = await pokemonCollection.updateOne({_id : id}, updateCommand);
    //     if(update.modifiedCount === 0) {
    //         throw "Updating the pokemon is not successful";
    //     }
    //     return await this.getPokemonById(id);
    // },
    addComment(id, updatePokemon) {
        return pokemons().then(pokemonCollection => {
            let updatePokemonData = {};

            if(updatePokemon.comments) {
                updatePokemonData.comments =  updatePokemon.comments;
            }

            let updateCommand = {
                $set: updatePokemonData
            };

            return pokemonCollection.updateOne({_id: id}, updateCommand).then(result => {
                return this.getPokemonById(id);
            })
        })
    }
}

module.exports = exportedMethods;