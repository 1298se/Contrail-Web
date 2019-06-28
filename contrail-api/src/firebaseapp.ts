
import * as admin from "firebase-admin";
import serviceAccount from "./ServiceAccountKey";

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default app;
