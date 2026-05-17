"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_NAME } from "@/graphql/queries";
import type { PokemonQueryData, PokemonQueryVariables } from "@/graphql/types";
import { useDebounce } from "@/hooks/useDebounce";

const LAST_SEARCHED_POKEMON_KEY = "lastSearchedPokemon";

function normalizePokemonName(value: string) {
  return value.trim().toLowerCase();
}

export function usePokemonSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nameFromUrl = normalizePokemonName(searchParams.get("name") ?? "");
  const [inputValue, setInputValue] = useState(nameFromUrl);
  const hasRestoredLastSearch = useRef(false);
  const debouncedInputValue = useDebounce(inputValue);

  const updateUrlName = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const normalizedName = normalizePokemonName(name);

      if (normalizedName) {
        params.set("name", normalizedName);
      } else {
        params.delete("name");
      }

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (!hasRestoredLastSearch.current) {
      hasRestoredLastSearch.current = true;

      if (nameFromUrl) {
        return;
      }

      const lastSearched = window.localStorage.getItem(LAST_SEARCHED_POKEMON_KEY);

      if (lastSearched) {
        updateUrlName(lastSearched);
      }
    }
  }, [nameFromUrl, updateUrlName]);

  useEffect(() => {
    setInputValue((currentValue) =>
      currentValue === nameFromUrl ? currentValue : nameFromUrl,
    );
  }, [nameFromUrl]);

  useEffect(() => {
    const normalizedInput = normalizePokemonName(debouncedInputValue);

    if (normalizedInput !== nameFromUrl) {
      updateUrlName(normalizedInput);
    }
  }, [debouncedInputValue, nameFromUrl, updateUrlName]);

  useEffect(() => {
    if (nameFromUrl) {
      window.localStorage.setItem(LAST_SEARCHED_POKEMON_KEY, nameFromUrl);
    }
  }, [nameFromUrl]);

  const queryVariables = useMemo(
    () => ({
      name: nameFromUrl,
    }),
    [nameFromUrl],
  );

  const queryResult = useQuery<PokemonQueryData, PokemonQueryVariables>(
    GET_POKEMON_BY_NAME,
    {
      variables: queryVariables,
      skip: !nameFromUrl,
      notifyOnNetworkStatusChange: true,
    },
  );

  const selectPokemon = useCallback(
    (name: string) => {
      setInputValue(name);
      updateUrlName(name);
    },
    [updateUrlName],
  );

  return {
    inputValue,
    searchedName: nameFromUrl,
    pokemon: queryResult.data?.pokemon ?? null,
    loading: queryResult.loading,
    error: queryResult.error,
    hasSearched: Boolean(nameFromUrl),
    onInputChange: setInputValue,
    onEvolutionClick: selectPokemon,
  };
}
