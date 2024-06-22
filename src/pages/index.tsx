import { Inter } from "next/font/google";
import CardPokemon from "@/components/CardPokemon";
import { useEffect, useState } from "react";
import { pokeApi } from "@/lib/api";
import { CgPokemon } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const inter = Inter({ subsets: ["latin"] });

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export default function Home() {
  const [data, setData] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const res = await pokeApi.get("pokemon?limit=20");
        setData(res.data.results);
        setNextUrl(res.data.next);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch blog posts:", error);
      }
    };

    fetchPokemonList();
  }, []);

  const fetchMorePokemon = async (url: string) => {
    setLoading(true);
    try {
      const res = await pokeApi.get(url);
      setData((prevPokemon) => [...prevPokemon, ...res.data.results]);
      setNextUrl(res.data.next);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch blog posts:", error);
    }
  };

  return (
    <main className={`relative overflow-hidden flex min-h-screen flex-col items-center justify-between py-12 md:py-24 bg-[#DFDCC4] ${inter.className}`}>
      <CgPokemon className="size-[22rem] absolute -top-32 -right-32 z-[5] text-white/30" />
      <div className="container">
        <h1 className="text-4xl font-extrabold mb-10 text-amber-800/60">Pokedex</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
          {
            data.map((results: Pokemon) => (
              <CardPokemon key={results.name} {...results} />
            ))
          }
        </div>
      </div>
      {nextUrl && (
        <Button
          variant="outline"
          size="icon"
          className="mx-auto my-8"
          disabled={loading}
          onClick={() => fetchMorePokemon(nextUrl)}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </Button>
      )}
    </main>
  );
}
