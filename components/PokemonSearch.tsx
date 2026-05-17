"use client";

import { PokemonResult } from "@/components/PokemonResult";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";
import styles from "./PokemonSearch.module.css";

export function PokemonSearch() {
  const {
    inputValue,
    searchedName,
    pokemon,
    loading,
    error,
    hasSearched,
    onInputChange,
    onEvolutionClick,
  } = usePokemonSearch();

  const showNotFound = hasSearched && !loading && !error && !pokemon;

  return (
    <div className={styles.searchPanel}>
      <label className={styles.label} htmlFor="pokemon-name">
        Pokemon name
      </label>
      <div className={styles.searchRow}>
        <input
          id="pokemon-name"
          className={styles.input}
          type="search"
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
          placeholder="Try pikachu, charizard, squirtle..."
          autoComplete="off"
        />
      </div>

      <div className={styles.feedback} aria-live="polite">
        {!hasSearched && (
          <p className={styles.muted}>Enter a Pokemon name to start searching.</p>
        )}
        {loading && <p className={styles.muted}>Loading Pokemon data...</p>}
        {error && (
          <p className={styles.error}>
            Unable to fetch Pokemon data. Please try again.
          </p>
        )}
        {showNotFound && (
          <p className={styles.error}>No Pokemon found for {searchedName}.</p>
        )}
      </div>

      {pokemon && !error && (
        <PokemonResult pokemon={pokemon} onEvolutionClick={onEvolutionClick} />
      )}
    </div>
  );
}
