import {
  bulbasaurMock,
  charmanderMock,
  squirtleMock,
} from "../test/mocks/pokemon-types";

describe("starter Pokemon types", () => {
  it("asserts Bulbasaur is a Grass type", () => {
    expect(bulbasaurMock.types).toContain("Grass");
  });

  it("asserts Charmander is a Fire type", () => {
    expect(charmanderMock.types).toContain("Fire");
  });

  it("asserts Squirtle is a Water type", () => {
    expect(squirtleMock.types).toContain("Water");
  });
});
