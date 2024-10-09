// objeto.types
const fragmento = document.createDocumentFragment();
const main = document.querySelector("main");
const template = document.createElement("template");
main.innerHTML = "";

const peticionApi = async () => {
    for (let i = 1; i <= 151; i++) {
        try {
            const peticion = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${i}`
            );
            const data = await peticion.json();
            if (data) pintarPokemones(data);
        } catch (error) {
            console.error("Error al obtener los datos " + error);
        }
    }
};

const pintarPokemones = (data) => {
    try {
        if (data) {
            template.innerHTML = `
                    <div class="card">
                        <img 
                        loading="lazy"
                        class="card_img" 
                        src=${data.sprites.other.dream_world.front_default} 
                        alt="">
                        <h2 class="card_title">${data.name}</h2>
                        <div class="types">
                            ${data.types
                                .map((type) => {
                                    const tipo = type.type.name;

                                    return `<span class="pokemon-type-${tipo} pokemon-type-span">${tipo}</span>`;
                                })
                                .join("")}
                        </div>
                    </div>
                `;

            const clonTemplate = template.content.cloneNode(true);
            fragmento.appendChild(clonTemplate);
            main.appendChild(fragmento);
        }
    } catch (error) {
        console.error("Hubo un error al pintar los data ", error);
    }
};

const pintarPokemonesType = async (e) => {
    const btnId = e.target.id;
    console.log(btnId);
    main.innerHTML = "";
    for (let i = 1; i <= 151; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await response.json();

        if (data) {
            const types = data.types.map((type) => type.type.name);
        // types = [ "tipo1", "tipo2" ]
            if (btnId === "all") {
                pintarPokemones(data);
            } else {
                if (types.some((type) => type.includes(btnId))) {
                    // console.log(tipos)
                    pintarPokemones(data);
                }
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    peticionApi();
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-types")) {
        pintarPokemonesType(e);
    }
});

