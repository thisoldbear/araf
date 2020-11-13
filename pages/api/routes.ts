import { NextApiRequest, NextApiResponse } from "next";
import { verifyIdToken } from "../../utils/auth/firebaseAdmin";
const routes = ["1", "2", "3", "4"];

// Based on https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/pages/api/getFood.js

export interface RoutesApiResponse {
  routes: string;
}

const getRoutes = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.token;

  try {
    await verifyIdToken(token);
    const data: RoutesApiResponse = {
      routes: routes[Math.floor(Math.random() * routes.length)],
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(401).send(`You are unauthorised ${error}`);
  }
};

export default getRoutes;
