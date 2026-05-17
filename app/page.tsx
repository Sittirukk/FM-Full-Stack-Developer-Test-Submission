import { Suspense } from "react";
import { PokemonSearch } from "@/components/PokemonSearch";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.shell} aria-labelledby="page-title">
        <div className={styles.header}>
          <p className={styles.kicker}>Pokemon GraphQL Search</p>
          <h1 id="page-title">Find Pokemon battle details</h1>
          <p className={styles.description}>
            Search by name to view special attacks and evolution paths.
          </p>
        </div>

        <Suspense fallback={<div className={styles.status}>Loading search...</div>}>
          <PokemonSearch />
        </Suspense>
      </section>
    </main>
  );
}
