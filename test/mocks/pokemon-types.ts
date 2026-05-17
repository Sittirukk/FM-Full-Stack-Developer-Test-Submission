import type { Pokemon } from "@/graphql/types";

export const bulbasaurMock: Pokemon = {
  id: "UG9rZW1vbjowMDE=",
  name: "Bulbasaur",
  image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
  types: ["Grass", "Poison"],
  attacks: {
    special: [
      {
        name: "Power Whip",
        damage: 70,
      },
    ],
  },
  evolutions: [
    {
      id: "UG9rZW1vbjowMDI=",
      name: "Ivysaur",
    },
  ],
};

export const charmanderMock: Pokemon = {
  id: "UG9rZW1vbjowMDQ=",
  name: "Charmander",
  image: "https://img.pokemondb.net/artwork/charmander.jpg",
  types: ["Fire"],
  attacks: {
    special: [
      {
        name: "Flamethrower",
        damage: 55,
      },
    ],
  },
  evolutions: [
    {
      id: "UG9rZW1vbjowMDU=",
      name: "Charmeleon",
    },
  ],
};

export const squirtleMock: Pokemon = {
  id: "UG9rZW1vbjowMDc=",
  name: "Squirtle",
  image: "https://img.pokemondb.net/artwork/squirtle.jpg",
  types: ["Water"],
  attacks: {
    special: [
      {
        name: "Aqua Tail",
        damage: 45,
      },
    ],
  },
  evolutions: [
    {
      id: "UG9rZW1vbjowMDg=",
      name: "Wartortle",
    },
  ],
};
