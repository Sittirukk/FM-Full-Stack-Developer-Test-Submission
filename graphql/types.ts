export type PokemonAttack = {
  name: string;
  damage: number;
};

export type PokemonEvolution = {
  id: string;
  name: string;
};

export type Pokemon = {
  id: string;
  name: string;
  image: string | null;
  types: string[];
  attacks: {
    special: PokemonAttack[];
  };
  evolutions: PokemonEvolution[] | null;
};

export type PokemonQueryData = {
  pokemon: Pokemon | null;
};

export type PokemonQueryVariables = {
  name: string;
};
