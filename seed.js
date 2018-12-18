const dbConnection = require('./dbConfig/mongoConnection');
const data = require("./data");
const users = data.user;
const pokemons = data.pokemons;

dbConnection().then(
  db => {
    return db
      .dropDatabase()
      .then(() => {
        return dbConnection;
      })
      .then(db => {
        return pokemons
          .addPokemon("1", "Balbusaur", "grass", 118, 111, 128, 1115, "so cool!")
          .then(() => {
            return pokemons.addPokemon(
                "147",
                "Dratini",
                "dragon",
                119,
                91,
                121,
                1004,
                "the best"
            );
          })
          .then(() => {
            return pokemons.addPokemon(
                "371",
                "Bagon",
                "dragon",
                134,
                93,
                128,
                1156,
                "my favorite"
            );
        
          });
      })
      .then(() => {
        console.log("Done seeding database");

      });
  },
  error => {
    console.error(error);
  }
);