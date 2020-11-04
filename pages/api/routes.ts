import { verifyIdToken } from "../../utils/auth/firebaseAdmin";
const routes = ["1", "2", "3", "4"];

// Based on https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/pages/api/getFood.js

const getRoutes = async (req, res) => {
  const token = req.headers.token;

  try {
    await verifyIdToken(token);
    return res.status(200).json({
      routes: routes[Math.floor(Math.random() * routes.length)],
    });
  } catch (error) {
    return res.status(401).send(`You are unauthorised ${error}`);
  }
};

export default getRoutes;
