"use client";

import Image from "next/image";
import { memo } from "react";
import type { Pokemon } from "@/graphql/types";
import { isValidPokemon } from "@/lib/pokemon-validation";
import styles from "./PokemonResult.module.css";

type PokemonResultProps = {
  pokemon: Pokemon;
  onEvolutionClick: (name: string) => void;
};

export const PokemonResult = memo(function PokemonResult({
  pokemon,
  onEvolutionClick,
}: PokemonResultProps) {
  if (!isValidPokemon(pokemon)) {
    return (
      <section className={styles.result} aria-label="Invalid Pokemon result">
        <p className={styles.empty}>Pokemon data is incomplete.</p>
      </section>
    );
  }

  const specialAttacks = pokemon.attacks.special;
  const evolutions = pokemon.evolutions ?? [];

  return (
    <section className={styles.result} aria-label={`${pokemon.name} details`}>
      <div className={styles.hero}>
        <div className={styles.imagePanel}>
          {pokemon.image ? (
            <Image
              className={styles.pokemonImage}
              src={pokemon.image}
              alt={pokemon.name}
              width={320}
              height={320}
            />
          ) : (
            <div className={styles.imageFallback} aria-hidden="true">
              {pokemon.name.slice(0, 1)}
            </div>
          )}
        </div>

        <div className={styles.heroContent}>
          <div className={styles.titleRow}>
            <h2>{pokemon.name}</h2>
          </div>

          <ul className={styles.typeList} aria-label={`${pokemon.name} types`}>
            {pokemon.types.map((type) => (
              <li key={type} className={styles.typeBadge}>
                {type}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.grid}>
        <div>
          <h3>Special attacks</h3>
          {specialAttacks.length > 0 ? (
            <ul className={styles.list}>
              {specialAttacks.map((attack) => (
                <li key={attack.name} className={styles.listItem}>
                  <span>{attack.name}</span>
                  <strong>{attack.damage}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>No special attacks available.</p>
          )}
        </div>

        <div>
          <h3>Evolutions</h3>
          {evolutions.length > 0 ? (
            <ul className={styles.evolutionList}>
              {evolutions.map((evolution) => (
                <li key={evolution.id}>
                  <a
                    className={styles.evolutionLink}
                    href={`/?name=${encodeURIComponent(
                      evolution.name.toLowerCase(),
                    )}`}
                    onClick={() => onEvolutionClick(evolution.name)}
                  >
                    {evolution.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>This Pokemon has no evolutions.</p>
          )}
        </div>
      </div>
    </section>
  );
});
