import React, { useEffect, useState } from "react";

import { CgPokemon } from "react-icons/cg";
import { pokeApi } from "@/lib/api";
import { Badge } from "./ui/badge";
import { typeBadgeColor, backgroundCard } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Pokemon {
  name: string;
  url: string;
}

interface TypePokemon {
  name: string;
  url: string;
}

interface SlotType {
  slot: number;
  type: TypePokemon;
}

const CardPokemon = ({ name, url }: Pokemon) => {
  const [pokemonType, setPokemonType] = useState<SlotType[]>([]);
  const [pokemonImage, setPokemonImage] = useState<string>("");

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const res = await pokeApi.get(`${url}`);
        setPokemonType(res.data.types);
        setPokemonImage(res.data.sprites.other['official-artwork'].front_default);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      }
    };

    fetchPokemonDetail();
  }, [url]);

  return (
    <>
      <Link
        href={`/pokemon/${name}`}
        className={`relative z-50 px-3 pt-4 rounded-3xl min-h-[140px] shadow-sm backdrop-blur-sm cursor-pointer 
                    ${backgroundCard(pokemonType[0]?.type.name || "normal")}`}
      >
        <h2 className="text-lg md:text-xl capitalize text-white font-bold mb-2">
          {name}
        </h2>
        <div className="relative">
          <div className="w-1/2 md:w-2/3 flex flex-wrap gap-1">
            {pokemonType.map((type) => (
              <Badge
                key={type.slot}
                className={`capitalize inline-block text-[10px] md:text-xs ${typeBadgeColor(
                  type.type.name
                )}`}
              >
                {type.type.name}
              </Badge>
            ))}
          </div>
        </div>
        {pokemonImage && (
          <Image
            src={pokemonImage}
            alt={name}
            width={70}
            height={70}
            className="absolute z-20 bottom-2 right-2 object-contain h-20 w-20 lg:h-32 lg:w-32"
          />
        )}
        <CgPokemon className="size-28 absolute -bottom-3 -right-3 z-[-1] text-white/10" />
      </Link>
    </>
  );
};

export default CardPokemon;
