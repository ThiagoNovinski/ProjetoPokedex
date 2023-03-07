var bug = document.createElement("bug");
bug.src = "./imagens/types/bug.png";


let listTypes = [bug];

const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImage');
const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');
const prev = document.querySelector('.buttonPrev');
const next = document.querySelector('.buttonNext');
const shiny = document.querySelector('.buttonShiny');
let atualNumber = 1;


const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);
    if (data) {

        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        atualNumber = data.id
        pokemonImage.src = data['sprites']['other']['official-artwork']['front_default'];
        if (data.id > 905) {
            console.log(data);
            pokemonImage.src = data['sprites']['other']['official-artwork']['front_default'];

        }
    }

    else {
        pokemonName.innerHTML = 'Not found';
        pokemonImage.innerHTML = '';
        pokemonNumber.innerHTML = '';

    }
}
const renderShiny = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    pokemonImage.src = data['sprites']['other']['official-artwork']['front_shiny'];
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';

});

prev.addEventListener('click', () => {
    if (atualNumber > 1) {
        atualNumber = atualNumber - 1;
        renderPokemon(atualNumber);
    } else { }

});

next.addEventListener('click', () => {
    if (atualNumber < 1008) {
        atualNumber = atualNumber + 1;
        renderPokemon(atualNumber);
    }

});
shiny.addEventListener('click', () => {
    renderShiny(atualNumber)
}
);
renderPokemon(atualNumber);
