import React, { useContext } from "react";
import Head from "next/head";
import firebase from "../utils/auth/firebase";
import { RouteCard, RouteCardProps } from "../components/RouteCard/RouteCard";
import { Route, RouteCategories } from "../types";
import { FilterContext } from "../components/Context/FilterContext";
import { RouteFilters } from "../components/Filters/RouteFilters";
import { Header } from "../components/Header/Header";

import styles from "./index.module.css";

interface HomeProps {
  routes: Route[];
  children: React.ReactNode;
}

const Home = ({ routes }: HomeProps) => {
  const { filterState } = useContext(FilterContext);

  const renderRouteCards = (routes: Route[]) => {
    const routeCards = routes.map((route) => {
      return filterState?.[RouteCategories[route.category]] ? (
        <RouteCard
          key={route.id}
          url={`/routes/${route.id}`}
          name={route.name}
          distance={route.distance}
          category={route.category}
          thumbnail={route.thumbnail}
        />
      ) : null;
    });

    return routeCards.every((element) => element === null) ? (
      <div className={styles.gridItemEmpty}>☹️ No routes ☹️</div>
    ) : (
      routeCards
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>araf.cc Routes</title>
        <meta
          name="site-url"
          content={`${process.env.NEXT_PUBLIC_VERCEL_URL}`}
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <h2>Routes</h2>
          <RouteFilters />
        </div>{" "}
        <div className={styles.grid}>
          <div className={styles.gridInner}>
            {renderRouteCards(routes)}
            {renderRouteCards(routes)}
            {renderRouteCards(routes)}
          </div>
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const firestore = await firebase.firestore();
  const collection = await firestore.collection("routes").get();

  const routes = collection.docs.map((doc) => {
    // Data for route cards
    const {
      name,
      distance,
      category,
      thumbnail,
    } = doc.data() as Route;

    return {
      id: doc.id,
      name,
      distance,
      category,
      thumbnail,
    };
  });

  return {
    props: {
      routes,
    },
  };
}

export default Home;
