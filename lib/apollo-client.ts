import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const POKEMON_GRAPHQL_ENDPOINT = "https://graphql-pokemon2.vercel.app/";

export function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: POKEMON_GRAPHQL_ENDPOINT,
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Pokemon: {
          keyFields: ["id"],
        },
      },
    }),
    devtools: {
      enabled: process.env.NODE_ENV === "development",
    },
  });
}
