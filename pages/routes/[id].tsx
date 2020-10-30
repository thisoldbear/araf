import Head from "next/head";
import firebase from "../../firebase";

export default function Route(props) {
  return (
    <div>
      <Head>
        <title>Route</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>
          Route - {props.id} - {props.name}
        </h1>
      </main>
    </div>
  );
}

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
