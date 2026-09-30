/* =========================================
   BOOSTER PACK
========================================= */

const boosterPack =
    document.getElementById("boosterPack");

const boosterOverlay =
    document.getElementById("boosterOverlay");

const openingText =
    document.getElementById("openingText");


/*
    Page load হওয়ার পর
    automatically booster open হবে।

    2 second wait করবে,
    তারপর animation শুরু হবে।
*/

window.addEventListener("load", function () {

    setTimeout(function () {

        // Start booster animation
        boosterPack.classList.add("opening");

        openingText.textContent =
            "✨ Opening your booster pack... ✨";


        /*
            Animation শেষ হওয়ার পর
            overlay hide হবে এবং Pikachu load হবে।
        */

        setTimeout(function () {

            boosterOverlay.classList.add("hide");

            // Load first Pokémon
            searchPokemon("pikachu");

        }, 1800);

    }, 1800);

});


/* =========================================
   ELEMENTS
========================================= */

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const loading =
    document.getElementById("loading");

const errorMessage =
    document.getElementById("errorMessage");

const pokemonCard =
    document.getElementById("pokemonCard");

const emptyState =
    document.getElementById("emptyState");

const pokemonNumber =
    document.getElementById("pokemonNumber");

const pokemonImage =
    document.getElementById("pokemonImage");

const pokemonName =
    document.getElementById("pokemonName");

const typeContainer =
    document.getElementById("typeContainer");

const pokemonHeight =
    document.getElementById("pokemonHeight");

const pokemonWeight =
    document.getElementById("pokemonWeight");

const abilitiesContainer =
    document.getElementById(
        "abilitiesContainer"
    );

const statsContainer =
    document.getElementById(
        "statsContainer"
    );


/* =========================================
   ABILITY BELOW IMAGE
========================================= */

const photoAbilityContainer =
    document.getElementById(
        "photoAbilityContainer"
    );


/* =========================================
   SEARCH BUTTON
========================================= */

searchBtn.addEventListener(
    "click",
    function () {

        const name =
            searchInput.value.trim();

        if (name !== "") {

            searchPokemon(name);

        }

    }
);


/* =========================================
   ENTER KEY
========================================= */

searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            const name =
                searchInput.value.trim();

            if (name !== "") {

                searchPokemon(name);

            }

        }

    }
);


/* =========================================
   QUICK SEARCH
========================================= */

const quickButtons =
    document.querySelectorAll(".quick-btn");


quickButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const pokemon =
                button.dataset.pokemon;

            searchInput.value =
                pokemon;

            searchPokemon(pokemon);

        }
    );

});


/* =========================================
   LIVE SEARCH
========================================= */

let searchTimer;

searchInput.addEventListener(
    "input",
    function () {

        clearTimeout(searchTimer);

        const name =
            searchInput.value.trim();

        if (name === "") {
            return;
        }


        searchTimer = setTimeout(
            function () {

                searchPokemon(name);

            },
            600
        );

    }
);


/* =========================================
   POKÉMON API
========================================= */

async function searchPokemon(name) {

    showLoading();

    hideError();


    try {

        const response =
            await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
            );


        if (!response.ok) {

            throw new Error(
                "Pokémon not found"
            );

        }


        const pokemon =
            await response.json();


        displayPokemon(pokemon);

    }


    catch (error) {

        console.log(error);

        showError();

    }


    finally {

        hideLoading();

    }

}


/* =========================================
   DISPLAY POKÉMON
========================================= */

function displayPokemon(pokemon) {


    /* NUMBER */

    pokemonNumber.textContent =
        "#" +
        String(pokemon.id)
            .padStart(3, "0");


    /* NAME */

    pokemonName.textContent =
        capitalize(pokemon.name);


    /* IMAGE */

    const officialImage =
        pokemon.sprites
            ?.other
            ?.["official-artwork"]
            ?.front_default;


    const normalImage =
        pokemon.sprites
            ?.front_default;


    pokemonImage.src =
        officialImage ||
        normalImage;


    pokemonImage.alt =
        capitalize(pokemon.name);


    /* TYPES */

    typeContainer.innerHTML = "";


    pokemon.types.forEach(
        function (typeData) {

            const type =
                typeData.type.name;


            const badge =
                document.createElement("span");


            badge.className =
                `type-badge type-${type}`;


            badge.textContent =
                type;


            typeContainer.appendChild(
                badge
            );

        }
    );


    /* HEIGHT */

    const height =
        pokemon.height / 10;


    pokemonHeight.textContent =
        height.toFixed(1) + " m";


    /* WEIGHT */

    const weight =
        pokemon.weight / 10;


    pokemonWeight.textContent =
        weight.toFixed(1) + " kg";


    /* ABILITIES */

    abilitiesContainer.innerHTML = "";


    pokemon.abilities.forEach(
        function (abilityData) {

            const ability =
                document.createElement("span");


            ability.className =
                "ability";


            ability.textContent =
                abilityData
                    .ability
                    .name
                    .replaceAll("-", " ");


            abilitiesContainer.appendChild(
                ability
            );

        }
    );


    /* =========================================
       ABILITY BELOW POKÉMON IMAGE
    ========================================= */

    photoAbilityContainer.innerHTML = "";


    pokemon.abilities.forEach(
        function (abilityData) {

            const ability =
                document.createElement("span");


            ability.className =
                "photo-ability-badge";


            ability.textContent =
                abilityData
                    .ability
                    .name
                    .replaceAll("-", " ");


            photoAbilityContainer.appendChild(
                ability
            );

        }
    );


    /* STATS */

    statsContainer.innerHTML = "";


    pokemon.stats.forEach(
        function (statData) {

            createStat(
                statData.stat.name,
                statData.base_stat
            );

        }
    );


    /* SHOW CARD */

    emptyState.classList.add(
        "hidden"
    );


    pokemonCard.classList.remove(
        "hidden"
    );


    /* Restart reveal animation */

    pokemonCard.classList.remove(
        "card-reveal"
    );


    void pokemonCard.offsetWidth;


    pokemonCard.classList.add(
        "card-reveal"
    );


    /* Scroll */

    setTimeout(function () {

        pokemonCard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


/* =========================================
   CREATE STAT
========================================= */

function createStat(
    name,
    value
) {

    const statRow =
        document.createElement("div");

    statRow.className =
        "stat-row";


    const statInfo =
        document.createElement("div");

    statInfo.className =
        "stat-info";


    const statName =
        document.createElement("span");

    statName.className =
        "stat-name";


    statName.textContent =
        name.replaceAll("-", " ");


    const statValue =
        document.createElement("span");

    statValue.className =
        "stat-value";


    statValue.textContent =
        value;


    statInfo.appendChild(
        statName
    );


    statInfo.appendChild(
        statValue
    );


    /* STAT BAR */

    const statBar =
        document.createElement("div");

    statBar.className =
        "stat-bar";


    const statFill =
        document.createElement("div");

    statFill.className =
        "stat-fill";


    const percentage =
        Math.min(
            (value / 255) * 100,
            100
        );


    statFill.style.width =
        percentage + "%";


    statBar.appendChild(
        statFill
    );


    statRow.appendChild(
        statInfo
    );


    statRow.appendChild(
        statBar
    );


    statsContainer.appendChild(
        statRow
    );

}


/* =========================================
   LOADING
========================================= */

function showLoading() {

    loading.classList.remove(
        "hidden"
    );

}


function hideLoading() {

    loading.classList.add(
        "hidden"
    );

}


/* =========================================
   ERROR
========================================= */

function showError() {

    errorMessage.classList.remove(
        "hidden"
    );


    pokemonCard.classList.add(
        "hidden"
    );


    emptyState.classList.add(
        "hidden"
    );

}


function hideError() {

    errorMessage.classList.add(
        "hidden"
    );

}


/* =========================================
   CAPITALIZE
========================================= */

function capitalize(text) {

    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );

}