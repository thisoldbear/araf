/* globals window */
import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../utils/auth/firebase";
import { setUserCookie } from "../../utils/auth/userCookies";
import { mapUserData } from "../../utils/auth/mapUserData";

const firebaseAuthConfig = {
  signInFlow: "popup",
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: "/",
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: ({ user }, redirectUrl) => {
      const userData = mapUserData(user);
      setUserCookie(userData);
      return true;
    },
  },
};

const FirebaseAuth: React.FC = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);

  return (
    <>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </>
  );
};

export default FirebaseAuth;
