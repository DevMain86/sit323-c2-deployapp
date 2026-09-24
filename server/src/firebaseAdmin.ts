// Firebase Admin initialisation. Loads service account credentials,
// boots the Admin SDK, and exposes a Firestore instance for backend use.

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

// If FIREBASE_SERVICE_ACCOUNT exists, use it.
// Otherwise fall back to the local serviceAccountKey.json file.
const raw = process.env.FIREBASE_SERVICE_ACCOUNT
  ? process.env.FIREBASE_SERVICE_ACCOUNT
  : readFileSync("./serviceAccountKey.json", "utf8");

const serviceAccount = JSON.parse(raw);

// Fix private key newline issues when using environment variables
if (serviceAccount.private_key) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
}

initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore();
