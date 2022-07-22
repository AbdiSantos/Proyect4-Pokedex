var pokedex = document.getElementById('pokedex');
var limit = 5;
var offset = 1;
function fetchPokemon(limit, offset) {
    offset = Math.floor(Math.random() * 150);
    var promises = [];
    for (var i = offset; i <= offset + limit; i++) {
        var url = "https://pokeapi.co/api/v2/pokemon/".concat(i);
        promises.push(fetch(url).then(function (res) { return res.json(); }));
    }
    Promise.all(promises).then(function (results) {
        var pokemon = results.map(function (result) { return ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map(function (type) { return type.type.name; }).join(', '),
            id: result.id
        }); });
        displayPokemon(pokemon);
    });
}
;
var displayPokemon = function (pokemon) {
    console.log(pokemon);
    var pokemonHTMLString = pokemon
        .map(function (pokeman) { return "\n        <li class=\"card\">\n            <img class=\"card-image\" src=\"".concat(pokeman.image, "\"/>\n            <h2 class=\"card-title\">").concat(pokeman.id, ". ").concat(pokeman.name, "</h2>\n            <p class=\"card-subtitle\">Type: ").concat(pokeman.type, "</p>\n        </li>\n    "); })
        .join('');
    if (pokedex)
        pokedex.innerHTML = pokemonHTMLString;
};
fetchPokemon(limit, offset);
