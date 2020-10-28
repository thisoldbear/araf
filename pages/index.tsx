import Head from "next/head";
import Link from "next/link";
import firebase from "../firebase";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {props?.routes?.map((route) => (
          <div key={route.id}>
            <p key={route}>{route.name}</p>
            <p key={route}>{route.distance}</p>

            <p>
              <Link href={`/routes/${route.id}`}>
                <a>View route</a>
              </Link>
            </p>
          </div>
        ))}
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
