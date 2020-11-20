require('dotenv').config();
const fs = require('fs');

const serviceAccount = {
  type: "service_account",
  project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  private_key_id: process.env.FB_KEY_ID,
  client_email: process.env.FB_CLIENT_EMAIL,
  client_id: process.env.FB_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rwk7t%40${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`
}

fs.writeFile('serviceAccount.json', JSON.stringify(
  {
    ...serviceAccount,
    // Parse JSON from env var
    // https://github.com/vercel/vercel/issues/749#issuecomment-707515089
    ...JSON.parse(process.env.FB_KEY)
  }), function (err) {
    if (err) throw err;
  });
