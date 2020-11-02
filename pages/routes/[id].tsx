import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import firebase from "../../firebase";
import { Route, RouteCategories, Paths, RouteKeys } from "../../types";

import { MapProps } from "../../components/Map/Map";

import styles from "./[id].module.css";

const Map = dynamic<MapProps>(
  () => import("../../components/Map/Map").then((module) => module.Map) as any,
  { ssr: false }
);

const Page: React.FC<Route> = ({ name, category, keys, gpx }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Route</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <h1>{name}</h1>
          <p>{RouteCategories[category]}</p>
          <ul>
            {keys.map((key) => (
              <li>{RouteKeys[key]} </li>
            ))}
          </ul>
        </div>
        {process.browser && <Map gpx={gpx} />}
      </main>
    </div>
  );
};

export default Page;

export async function getStaticProps(context) {
  const firestore = await firebase.firestore();
  const route = await firestore
    .collection("routes")
    .doc(context.params.id)
    .get();

  return {
    props: {
      id: route.id,
      ...route.data(),
    },
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const firestore = await firebase.firestore();

  let paths: Array<Paths> = [];

  const routes = await firestore.collection("routes").get();

  routes.forEach((doc) =>
    paths.push({
      params: {
        id: doc.id,
      },
    })
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths,
    fallback: false,
  };
}
