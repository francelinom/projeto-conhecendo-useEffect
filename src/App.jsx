import {useEffect, useState} from "react";
import UserContext from "./contexts/UserContext.js";
import UserInfo from "./components/UserInfo.jsx";

async function fetchPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    return data.results;
}

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [pokemonShown, setPokemonShown] = useState(null);

    const user = {
        name: 'João',
        email: 'joao@email.com'
    }

    useEffect(() => {
        fetchPokemon().then((data) => {
            setPokemon(data);
        })
    }, []);

    /**
     * Uma possinilidade de utilizar sem o useEffect é com o exemplo abaixo
     */

        // if (pokemon.length === 0) {
        //     fetchPokemon().then(resp => {
        //         setPokemon(resp);
        //     })
        // }

    const showDatailsPokemon = async (url) => {
            const data = await fetch(url).then(res => res.json());
            setPokemonShown(data);
        }

    return (
        <div className="app">
            <div>
                <h2>Pokémon</h2>
                <ul className="pokemon">
                    {pokemon.map(mon => (
                        <li key={mon.name}>
                            <span>{mon.name}</span>
                            <button onClick={() => showDatailsPokemon(mon.url)}>
                                Ver detalhes
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {pokemonShown ? (
                <div>
                    <h2>{pokemonShown.name}</h2>
                    <img
                        src={pokemonShown.sprites.front_default}
                        alt=""
                    />
                    <div className="stat">
                        <b>Tipo: </b>
                        {pokemonShown.types.map(({type}) => (
                            <span key={type.name}>{type.name} </span>
                        ))}
                    </div>
                    <div className="stat">
                        <b>Altura: </b>{pokemonShown.height / 10} m
                    </div>
                    <div className="stat">
                        <b>Peso: </b>{pokemonShown.weight / 10} Kg
                    </div>
                    <div className="stat">
                        <b>Atributos</b>
                        <ul>
                            {pokemonShown.stats.map(({base_stat, stat}) => (
                                <li key={stat.name}>
                                    {stat.name}: {base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="stat">
                        <b>Habilidades</b>
                        <ul>
                            {pokemonShown.abilities.map(({ability, is_hidden}) => (
                                <li key={ability.name}>
                                    {ability.name}
                                    {is_hidden && " (secreta)"}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Selecione um Pokémon para ver os detalhes</p>
            )}
            <div>
                <UserContext.Provider value={user}>
                    <h1>Exemplo Context</h1>
                    <UserInfo />
                </UserContext.Provider>
            </div>
        </div>
    )
}

export default App
