import * as React from "react";
import Head from "next/head";
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
        {props?.docs?.map((doc) => (
          <span key={doc}>{doc}</span>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const firestore = await firebase.firestore();
  const collection = await firestore.collection("test").get();

  return {
    props: {
      docs: collection.docs.map((doc) => doc.id),
    },
  };
}
