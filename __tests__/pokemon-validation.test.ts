import { isValidPokemon } from "@/lib/pokemon-validation";

describe("isValidPokemon", () => {
  it("accepts a complete Pokemon payload", () => {
    expect(
      isValidPokemon({
        id: "UG9rZW1vbjowMjU=",
        name: "Pikachu",
        types: ["Electric"],
        attacks: {
          special: [
            {
              name: "Discharge",
              damage: 35,
            },
          ],
        },
        evolutions: [
          {
            id: "UG9rZW1vbjowMjY=",
            name: "Raichu",
          },
        ],
      }),
    ).toBe(true);
  });

  it("rejects incomplete Pokemon payloads", () => {
    expect(
      isValidPokemon({
        id: "UG9rZW1vbjowMjU=",
        name: "Pikachu",
        types: ["Electric"],
        attacks: {
          special: [
            {
              name: "Discharge",
              damage: "35",
            },
          ],
        },
        evolutions: null,
      }),
    ).toBe(false);
  });
});
