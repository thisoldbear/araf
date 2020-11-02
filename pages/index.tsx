import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import firebase from "../firebase";
import { RouteCard, RouteCardProps } from "../components/RouteCard/RouteCard";
import { Route, RouteCategories } from "../types";

import { FilterContext } from "../components/Context/FilterContext";

import { RouteFilters } from "../components/Filters/RouteFilters";

import styles from "../styles/Home.module.css";

export default function Home({ routes }) {
  const { filterState, filterStateDispatch } = useContext(FilterContext);
  const renderRouteCards = (routes: []) => {
    const routeCards = routes.map((route: Route) => {
      return filterState?.[RouteCategories[route.category]] ? (
        <Link href={`/routes/${route.id}`} key={route.id}>
          <div>
            <RouteCard
              name={route.name}
              distance={route.distance}
              category={route.category}
            />
          </div>
        </Link>
      ) : null;
    });

    return routeCards.every((element) => element === null) ? (
      <div>No routes</div>
    ) : (
      routeCards
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <RouteFilters />
        <div className={styles.grid}>{renderRouteCards(routes)}</div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const firestore = await firebase.firestore();
  const collection = await firestore.collection("routes").get();

  const routes = collection.docs.map((doc) => {
    // Data for route cards
    const { name, distance, category } = doc.data() as RouteCardProps;

    return {
      id: doc.id,
      name,
      distance,
      category,
    };
  });

  return {
    props: {
      routes,
    },
  };
}
