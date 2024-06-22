import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const typeBadgeColor = (type: string): string => {
  switch (type) {
    case "grass":
      return "bg-[#78C850]";
    case "fire":
      return "bg-[#F08030]";
    case "poison":
      return "bg-[#A040A0]";
    case "flying":
      return "bg-[#F85888]";
    case "normal":
      return "bg-[#A8A878]";
    case "bug":
      return "bg-[#A8B820]";
    case "water":
      return "bg-[#6890F0]";
    case "electric":
      return "bg-[#F8D030]";
    case "ice":
      return "bg-[#98D8D8]";
    case "fighting":
      return "bg-[#C03028]";
    case "ground":
      return "bg-[#E0C068]";
    case "psychic":
      return "bg-[#F85888]";
    case "rock":
      return "bg-[#B8A038]";
    case "ghost":
      return "bg-[#725B94]";
    case "dark":
      return "bg-[#705848]";
    case "dragon":
      return "bg-[#7038F8]";
    case "steel":
      return "bg-[#B8B8D0]";
    case "fairy":
      return "bg-[#EEB5BB]";
    default:
      return "bg-[#000]";
  }
};

export const backgroundCard = (type: string): string => {
  switch (type) {
    case "grass":
      return "bg-[#78C850]/60";
    case "fire":
      return "bg-[#F08030]/60";
    case "poison":
      return "bg-[#A040A0]/60";
    case "flying":
      return "bg-[#F85888]/60";
    case "normal":
      return "bg-[#A8A878]/60";
    case "bug":
      return "bg-[#A8B820]/60";
    case "water":
      return "bg-[#6890F0]/60";
    case "electric":
      return "bg-[#F8D030]/60";
    case "ice":
      return "bg-[#98D8D8]/60";
    case "fighting":
      return "bg-[#C03028]/60";
    case "ground":
      return "bg-[#E0C068]/60";
    case "psychic":
      return "bg-[#F85888]/60";
    case "rock":
      return "bg-[#B8A038]/60";
    case "ghost":
      return "bg-[#725B94]/60";
    case "dark":
      return "bg-[#705848]/60";
    case "dragon":
      return "bg-[#7038F8]/60";
    case "steel":
      return "bg-[#B8B8D0]/60";
    case "fairy":
      return "bg-[#EEB5BB]/60";
    default:
      return "bg-[#000]/60";
  }
};

export const progressBarColor = (type: string): string => {
  switch (type) {
    case "grass":
      return "[&>*]:bg-[#78C850]";
    case "fire":
      return "[&>*]:bg-[#F08030]";
    case "poison":
      return "[&>*]:bg-[#A040A0]";
    case "flying":
      return "[&>*]:bg-[#F85888]";
    case "normal":
      return "[&>*]:bg-[#A8A878]";
    case "bug":
      return "[&>*]:bg-[#A8B820]";
    case "water":
      return "[&>*]:bg-[#6890F0]";
    case "electric":
      return "[&>*]:bg-[#F8D030]";
    case "ice":
      return "[&>*]:bg-[#98D8D8]";
    case "fighting":
      return "[&>*]:bg-[#C03028]";
    case "ground":
      return "[&>*]:bg-[#E0C068]";
    case "psychic":
      return "[&>*]:bg-[#F85888]";
    case "rock":
      return "[&>*]:bg-[#B8A038]";
    case "ghost":
      return "[&>*]:bg-[#725B94]";
    case "dark":
      return "[&>*]:bg-[#705848]";
    case "dragon":
      return "[&>*]:bg-[#7038F8]";
    case "steel":
      return "[&>*]:bg-[#B8B8D0]";
    case "fairy":
      return "[&>*]:bg-[#EEB5BB]";
    default:
      return "[&>*]:bg-[#000]";  
  }
};
