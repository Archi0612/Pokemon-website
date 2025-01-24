import React from "react";
import Card from "./Card";
import { FaInfoCircle } from "react-icons/fa";

interface PokemonCardProps {
  name: string;
  image: string;
  onIconClick: (name: string) => void; // Pass the function as a prop
}

const IndividualPokemonCard: React.FC<PokemonCardProps> = ({
  name,
  image,
  onIconClick,
}) => {
  const myImage = image || "/public/errorImage.png";

  return (
    <Card
      title={name}
      content={
        <div className="relative">
          {/* Info Icon */}
          <button
            className="bg-blue-300 p-2 rounded-full hover:bg-blue-200 flex items-center justify-center"
            onClick={() => onIconClick(name)} // Call the function with the Pokémon's name
            title="More Info"
          >
            <FaInfoCircle className="text-gray-700 hover:text-gray-900" size={30} />
          </button>

          {/* Pokémon Image */}
          <img
            src={myImage}
            alt={name}
            className="w-full rounded-lg object-cover"
          />
        </div>
      }
    />
  );
};

export default IndividualPokemonCard;
