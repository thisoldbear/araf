import Head from "next/head";
import Link from "next/link";
import firebase from "../firebase";
import { RouteCard } from "../components/RouteCard/RouteCard";

import styles from "../styles/Home.module.css";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          {props?.routes?.map((route) => (
            <Link href={`/routes/${route.id}`} key={route.id}>
              <div>
                <RouteCard name={route.name} distance={route.distance} />
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
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return {
    props: {
      routes,
    },
  };
}
