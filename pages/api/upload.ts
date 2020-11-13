import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import nextConnect from "next-connect";
import firebaseAdmin from "../../utils/auth/firebaseAdmin";

const uploader: multer.Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});

interface ExtendedRequest extends NextApiRequest {
  file: Express.Multer.File;
}

const handler = nextConnect<ExtendedRequest, NextApiResponse>()
  .use(uploader.single("image"))
  .post(async (req, res) => {
    try {
      if (!req.file) {
        res.status(400).send("No file uploaded.");
        return;
      }

      const bucket = firebaseAdmin
        .storage()
        .bucket(process.env.NEXT_PUBLIC_FIREBASE_BUCKET_URL);

      const file = bucket.file(req.file.originalname);

      const writeStream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      writeStream.on("finish", () => {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURI(file.name)}?alt=media`;
        res
          .status(200)
          .send({ fileName: req.file.originalname, fileLocation: publicUrl });
      });

      writeStream.end(req.file.buffer);
    } catch (error) {
      res.status(400).send(`Error, could not upload file: ${error}`);

      return;
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
