import type { Pokemon } from "@/graphql/types";

export function isValidPokemon(value: unknown): value is Pokemon {
  if (!value || typeof value !== "object") {
    return false;
  }

  const pokemon = value as Partial<Pokemon>;

  return (
    typeof pokemon.id === "string" &&
    typeof pokemon.name === "string" &&
    (pokemon.image === null || typeof pokemon.image === "string") &&
    Array.isArray(pokemon.types) &&
    pokemon.types.every((type) => typeof type === "string") &&
    !!pokemon.attacks &&
    Array.isArray(pokemon.attacks.special) &&
    pokemon.attacks.special.every(
      (attack) =>
        typeof attack.name === "string" && typeof attack.damage === "number",
    ) &&
    (pokemon.evolutions === null ||
      (Array.isArray(pokemon.evolutions) &&
        pokemon.evolutions.every(
          (evolution) =>
            typeof evolution.id === "string" &&
            typeof evolution.name === "string",
        )))
  );
}
