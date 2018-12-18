const pokemonData = mongoCollection.pokemons;

(function(){
    var filterform = document.getElementById("filter-form");
    var errorContainer = document.getElementById("error-container");
    var resultContainer = document.getElementById("result-container");
    var errorT = errorContainer.getElementsByClassName("text-goes-here")[0];
    var resultT = resultContainer.getElementsByClassName("text-goes-here")[0];
    var stringElement = document.getElementById("string");

    if(filterform){
        filterform.addEventListener("search", function(event){
            event.preventDefault();

            try{
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");

                var string = stringElement.string;

                var pokemon = pokemonData.getPokemonByName(string);
                console.log(pokemon);
                resultT.appendChild(pokemon);
                resultT.appendChild(document.createElement("br"));
                resultContainer.remove("hidden");
                filterform.requestFullscreen();


            } catch(error){
                error= error.message;
            }
            errorT.textContent = error;
        });
    }







})();