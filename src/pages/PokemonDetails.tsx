import React, { useEffect, useState } from "react";

interface PokemonInfo {
  name: string;
  sprites: { other: { home: { front_default: string } } };
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
}

interface PokemonDetailsProps {
  id: string; // Pokémon name or ID passed as a prop
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ id }) => {
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPokemonDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      console.error("Error fetching Pokémon details:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, [id]);

  const playPokemonCry = () => {
    if (pokemon) {
      const audio = new Audio(
        `https://play.pokemonshowdown.com/audio/cries/${pokemon.name.toLowerCase()}.mp3`
      );
      audio.play();
    }
  };

  if (loading) {
    return <h2 className="text-center">Loading...</h2>;
  }

  if (!pokemon) {
    return <h2 className="text-center">Pokemon not found!</h2>;
  }
const image = pokemon.sprites.other?.home?.front_default || "/public/errorImage.png";
  return (
    <div className="p-4">
      <div className="bg-purple-100 rounded-lg shadow-md p-4 opacity-70 border-black border-2">
        <h1 className="text-sky-700 drop-shadow-md text-4xl font-bold text-center mb-4 capitalize">
          {pokemon.name}
        </h1>
        <img
          src= {image}
          alt={pokemon.name}
          className="rounded-lg"
        />
          <div className="flex flex-col justify-center items-center">
            <button
              onClick={playPokemonCry}
              className="bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-700 mt-4"
            >
              Play Sound
            </button>
          </div>

        <div className="flex justify-between">
          <div className="flex flex-col justify-start">
            <p className="font-bold text-xl mb-2 capitalize">About {pokemon.name}:</p>
            <p><strong>Height:</strong> {pokemon.height} dm</p>
            <p><strong>Weight:</strong> {pokemon.weight} hg</p>
            <p><strong>Abilities:</strong></p>
            
              {pokemon.abilities.map((item, index) => (
                <div className="">
                        <p key={index} className="">{item.ability.name}</p>
                </div>
          
              ))}
            
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
