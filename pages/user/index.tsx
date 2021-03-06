import useSWR from "swr";
import Link from "next/link";
import Head from "next/head";
import { useUser } from "../../utils/auth/useUser";
import { Header } from "../../components/Header/Header";
import { RoutesApiResponse } from "../api/routes";
import { fetcher } from "../../utils/fetcher";

import styles from "./index.module.css";

// Based on https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/pages/index.js

const User: React.FC = () => {
  const { user, logout } = useUser();

  const { data, error } = useSWR<RoutesApiResponse, unknown>(
    user ? ["/api/routes", user.token] : null,
    fetcher
  );

  if (!user) {
    return (
      <div className={styles.container}>
        <Head>
          <title>My Account</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className={styles.main}>
          <div className={styles.user}>
            <p>Hi there!</p>
            <p>
              You are not signed in.{" "}
              <Link href={"/auth"}>
                <a
                  style={{
                    display: "inline-block",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Sign in
                </a>
              </Link>
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>My Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.user}>
          <h1>Your Account</h1>
          <p>You're signed in. Email: {user.email}</p>
          <p
            style={{
              display: "inline-block",
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => logout()}
          >
            Log out
          </p>

          <p>
            <Link href={"/"}>
              <a
                style={{
                  display: "inline-block",
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Home
              </a>
            </Link>
          </p>

          <p>
            <Link href={"/routes/new"}>
              <a
                style={{
                  display: "inline-block",
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Add new route
              </a>
            </Link>
          </p>

          {error && <div>Failed to fetch routes!</div>}

          {data && !error ? (
            <div>
              <h2>Routes</h2>
              Routes {data.routes}.
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default User;
