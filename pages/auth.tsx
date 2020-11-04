import Head from "next/head";
import FirebaseAuth from "../components/Auth/FirebaseAuth";
import { Header } from "../components/Header/Header";

import styles from "./auth.module.css";

const Auth = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.auth}>
          <h1>Sign in</h1>
          <div>
            <FirebaseAuth />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
