import { Badge } from "@/components/ui/badge";
import { pokeApi } from "@/lib/api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { typeBadgeColor, backgroundCard, progressBarColor } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { CgPokemon } from "react-icons/cg";
import Link from "next/link";
import { ArrowLeft, HeartIcon } from "lucide-react";

interface PokemonData {
  name: string;
  order: number;
  abilities: { ability: { name: string } }[];
  species: { name: string; url: string };
  types: { slot: number; type: { name: string } }[];
  height: number;
  weight: number;
  stats: { base_stat: number; effort: number; stat: { name: string } }[];
  sprites: {
    other: {
      [key: string]: {
        front_default: string;
      };
    };
  };
  moves: { move: { name: string ; url: string } }[];
}

interface PokemonSpeciesData {
  evolution_chain: {
    url: string;
  };
  genera: {
    genus: string;
    language: { name: string };
  }[];
  gender_rate: number;
  egg_groups: { name: string }[];
  habitat: { name: string };
}

interface EvolutionData {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionData[];
  evolution_details: {
    min_level: number | null;
    trigger: {
      name: string;
    };
  }[];
}

const Pokemon = () => {
  const router = useRouter();
  const [data, setData] = useState<PokemonData | null>(null);
  const [speciesData, setSpeciesData] = useState<PokemonSpeciesData | null>(
    null
  );
  const [evolutionData, setEvolutionData] = useState<EvolutionData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!router.query.slug) return;
      try {
        const res = await pokeApi.get(`pokemon/${router.query.slug}`);
        setData(res.data);

        const speciesRes = await pokeApi.get(res.data.species.url);
        setSpeciesData(speciesRes.data);

        const evolutionRes = await pokeApi.get(
          speciesRes.data.evolution_chain.url
        );
        setEvolutionData(evolutionRes.data.chain);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch blog posts:", error);
      }
    };

    fetchPokemon();
  }, [router.query.slug]);

  const genus =
    speciesData?.genera
      .find((g) => g.language.name === "en")
      ?.genus.replace("Pokémon", "")
      .trim() || "N/A";

  const renderAbout = () => {
    if (!data) return null;
    return (
      <>
        <div className="flex gap-16">
          <div className="text-slate-500 text-xs md:text-base flex flex-col gap-4">
            <p>Species</p>
            <p>Height</p>
            <p>Weight</p>
            <p>Abilities</p>
          </div>
          <div className="font-semibold text-xs md:text-base capitalize flex flex-col gap-4">
            <p>{genus}</p>
            <p>{data?.height} feet</p>
            <p>{data?.weight} lbs</p>
            <p>
              {data?.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4">Breeding</h3>
          <div className="flex gap-12">
            <div className="text-slate-500 text-xs md:text-base flex flex-col gap-4">
              <p>Gender Ratio</p>
              <p>Egg Groups</p>
              <p>Habitat</p>
            </div>
            <div className="font-semibold text-xs md:text-base capitalize flex flex-col gap-4">
              <p>{speciesData?.gender_rate}</p>
              <p>
                {speciesData?.egg_groups.map((group) => group.name).join(", ")}
              </p>
              <p>{speciesData?.habitat?.name}</p>
            </div>
          </div>
        </div>
      </>
    );
  };
  const renderBaseStats = () => {
    if (!data) return null;
    return (
      <div className="grid grid-cols-3 gap-1">
        <div className="text-slate-500 capitalize text-xs md:text-base flex flex-col gap-4">
          {data?.stats.map((stat, index) => (
            <p key={`stat-name-${index}`}>{stat.stat.name}</p>
          ))}
        </div>
        <div className="font-semibold text-xs md:text-base capitalize flex flex-col gap-4 text-center">
          {data?.stats.map((stat, index) => (
            <p key={`stat-base-${index}`}>{stat.base_stat}</p>
          ))}
        </div>
        <div className="flex flex-col gap-[25px]">
          {data?.stats.map((stat, index) => (
            <Progress
              key={`progress-${index}`}
              value={stat.base_stat}
              className={`h-2 md:h-4 ${progressBarColor(data?.types[0]?.type.name || "normal")}`}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderEvolutionChain = (evolution: EvolutionData | null) => {
    if (!evolution) return null;
    return (
      <div className="flex flex-col items-center">
        <div className="text-center">
          <Link href={`/pokemon/${evolution.species.name}`}>
            <span className="capitalize font-semibold text-lg md:text-xl text-blue-500">
              {evolution.species.name}
            </span>
          </Link>
        </div>
        {evolution.evolves_to.length > 0 && (
          <div className="mt-4">
            {evolution.evolves_to.map((evo, index) => (
              <div key={index} className="mt-2">
                {renderEvolutionChain(evo)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderMoves = () => {
    if (!data) return null; 
    return (
      <div className="grid grid-cols-3 gap-1 h-[350px] w-full overflow-y-scroll">
        {data?.moves.map((move, index) => (
          <div
            key={`move-${index}`}
            className="text-slate-500 capitalize text-xs flex flex-col gap-4"
          >
            <p>{move.move.name}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main
      className={`relative overflow-x-hidden min-h-screen pt-8 md:pt-18 ${backgroundCard(
        data?.types[0]?.type.name || "normal"
      )}`}
    >
      {loading ? (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-white">
          Loading...
        </div>
      ) : (
        <Image
          src={data?.sprites.other["official-artwork"].front_default || ""}
          alt={data?.name || ""}
          className="absolute z-50 top-1/4 md:top-[14%] left-1/2 transform -translate-x-1/2 -translate-y-1/4 md:-translate-y-[14%] size-72 md:size-96"
          width={200}
          height={200}
          priority
        />
      )}
      <CgPokemon className="size-96 md:size-[500px] absolute top-48 md:top-10 -right-20 z-10 text-white/30" />

      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <ArrowLeft className="text-white" />
          </Link>
          <HeartIcon className="text-white" />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-7xl text-white capitalize font-extrabold mb-3">
              {data?.name}
            </h1>
            <div className="flex gap-1">
              {data?.types.map((type) => (
                <Badge
                  key={type.slot}
                  className={`capitalize inline-block ${typeBadgeColor(
                    type.type.name
                  )}`}
                >
                  {type.type.name}
                </Badge>
              ))}
            </div>
          </div>
          <span className="text-2xl md:text-5xl text-white font-extrabold">
            #{data?.order}
          </span>
        </div>
      </div>
      <div className="relative h-screen w-full overflow-hidden z-20">
        <div className="absolute bottom-0 top-1/3 h-full w-full rounded-t-[32px] bg-white px-2 pt-6">
          <Tabs defaultValue="about" className="h-full w-full mt-4 bg-white">
            <TabsList className="container grid w-full grid-cols-4 bg-white h-14 *:text-xs *:md:text-base *:font-semibold">
              <TabsTrigger
                value="about"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 border-b-2 border-slate-200/50 rounded-none py-4"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="baseStats"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 border-b-2 border-slate-200/50 rounded-none py-4"
              >
                Base Stats
              </TabsTrigger>
              <TabsTrigger
                value="evolution"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 border-b-2 border-slate-200/50 rounded-none py-4"
              >
                Evolution
              </TabsTrigger>
              <TabsTrigger
                value="moves"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 border-b-2 border-slate-200/50 rounded-none py-4"
              >
                Moves
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="about"
              className="py-4"
            >
              <div className="container min-h-full flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
                {renderAbout()}
              </div>
            </TabsContent>
            <TabsContent
              value="baseStats"
              className="py-4"
            >
              <div className="container">{renderBaseStats()}</div>
            </TabsContent>
            <TabsContent
              value="evolution"
              className="py-4"
            >
              <div className="container">
                {renderEvolutionChain(evolutionData)}
              </div>
            </TabsContent>
            <TabsContent
              value="moves"
              className="py-4"
            >
              <div className="container">
                {renderMoves()}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default Pokemon;
