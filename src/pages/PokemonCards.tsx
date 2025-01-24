import React, { useEffect, useState } from "react";
import IndividualPokemonCard from "../components/IndividualPokemonCard";
import Pagination from "./Pagination";
import Shimmer from "../components/Shimmer";
import Modal from "../components/modal";
import PokemonDetails from "./PokemonDetails";

interface Pokemon {
  name: string;
  url: string;
  image: string;
}

const PokemonCards: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [allPokemonList, setAllPokemonList] = useState<Pokemon[]>([]);
  const [filterPokemon, setFilterPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState("");

  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null); // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const limit = 20;

  const fetchAllPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
      const data = await response.json();

      const allPokemonDetails = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const response = await fetch(pokemon.url);
          const pokemonData = await response.json();
          return {
            name: pokemon.name,
            image: pokemonData.sprites?.other?.showdown?.front_default ,
          };
        })
      );

      setAllPokemonList(allPokemonDetails);
    } catch (err) {
      console.error("Error fetching all Pokémon:", err);
    }
  };

  const fetchPokemon = async (page: number) => {
    setLoading(true);
    const offset = (page - 1) * limit;

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
      const totalCountOfPages = Math.ceil(data.count / limit);
      setTotalPage(totalCountOfPages);

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const response = await fetch(pokemon.url);
          const pokemonData = await response.json();
          return {
            name: pokemon.name,
            image: pokemonData.sprites?.other?.showdown?.front_default ,
          };
        })
      );

      setPokemonList(pokemonDetails);
      setFilterPokemon(pokemonDetails);
    } catch (err) {
      console.error("Error fetching Pokémon:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(currPage);
    fetchAllPokemon();
  }, [currPage]);

  const handleSearch = () => {
    if (!searchInput) {
      setFilterPokemon(pokemonList);
      return;
    }

    const searchPokemon = allPokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
    setFilterPokemon(searchPokemon);
    // console.log("Filtered data", searchPokemon);
    setSearchInput("");
  };
    // Detect Enter key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch(); // Call search when Enter is pressed
      }
    };
  

  const openModal = (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setIsModalOpen(false);
  };

  return (
    
      <div className="bg-[url(/public/pikachu.png)] p-[2rem] pt-[1rem] bg-cover">

        <div className="flex justify-center">
        <img src="/public/title.png" 
        alt="Pokemon" 
        className="flex w-[20rem] rounded-lg shadow-xl shadow-blue-300"/>
        </div>
      {/* Search Bar */}
      <div className="flex items-center justify-center p-3 m-3">
        
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Pokemon"
          className="bg-blue-50 border border-gray-300 rounded-l-md p-2"
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-50 text-blue-900 px-4 py-2 rounded-r-md hover:bg-blue-100"
        >
          Search
        </button>
      </div>

      {/* Pokémon Cards */}
      {loading ? (<Shimmer /> ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-4 w-full">

        {filterPokemon.map((pokemon) => (
          <IndividualPokemonCard
            key={pokemon.name}
            name={pokemon.name}
            image={pokemon.image}
            onIconClick={openModal} // Pass the modal open function
          />
        ))}

    </div>
      )}

      {/* Pagination */}
      <Pagination
        onNext={() => setCurrPage((page) => Math.min(page + 1, totalPage))}
        onPrev={() => setCurrPage((page) => Math.max(page - 1, 1))}
        currPage={currPage}
        isDisabled={currPage === 1}
        onFirst={() => setCurrPage(1)}
        onLast={() => setCurrPage(totalPage)}
        totalPages={totalPage}
      />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedPokemon && <PokemonDetails id={selectedPokemon} />}
      </Modal>
      </div>
    
  );
};

export default PokemonCards;
