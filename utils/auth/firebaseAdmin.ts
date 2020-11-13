import * as firebaseAdmin from "firebase-admin";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY)
    ),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_BUCKET_URL,
  });
}

export const verifyIdToken = (token) =>
  firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error;
    });

export default firebaseAdmin;
