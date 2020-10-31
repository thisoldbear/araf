import Head from "next/head";
import Link from "next/link";
import firebase from "../firebase";
import { RouteCard, RouteCardProps } from "../components/RouteCard/RouteCard";

import styles from "../styles/Home.module.css";

export default function Home({ routes }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          {routes?.map((route) => (
            <Link href={`/routes/${route.id}`} key={route.id}>
              <div>
                <RouteCard
                  name={route.name}
                  distance={route.distance}
                  categories={route.categories}
                />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const firestore = await firebase.firestore();
  const collection = await firestore.collection("routes").get();

  const routes = collection.docs.map((doc) => {
    // Data for route cards
    const { name, distance, categories } = doc.data() as RouteCardProps;

    return {
      id: doc.id,
      name,
      distance,
      categories,
    };
  });

  return {
    props: {
      routes,
    },
  };
}
