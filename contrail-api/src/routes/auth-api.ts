import express from "express";
import * as admin from "firebase-admin";
import * as path from "path";
import serviceAccount from "../ServiceAccountKey";

const router = express.Router();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

router.get("/", (req, res) => {
  const authPage = path.join(__dirname, "public", "login.html");
  console.log(`Root route received, sending root: ${authPage}`);
  res.sendFile(authPage);
});

router.post("/api/auth", (req, res) => {
  const token = req.body;
  if (token == null) {
    res.status(401).send("Bad Request: ID Token is null");
  } else {
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        res.status(200).send("userLoginSuccessful");
      })
      .catch((error) => {
        res.status(500).send("userLoginFailed")
        console.error(`/login - ${error}`);
      });
  }
});

router.post("/api/register", (req, res) => {
  const token = req.body;
  if (token == null) {
    res.status(401).send("Bad Request: ID Token is null");
  } else {
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        return admin.auth().getUser(decodedToken.uid);
      })
      .then((userRecord) => {
        const newUser = db.collection("users").doc(userRecord.uid);
        newUser.set({
          displayName: userRecord.displayName,
          documents: {
            owned: [],
            sharedToUser: [],
          },
          email: userRecord.email,
          profileImageUri: null,
          userId: userRecord.uid,
        });
        console.log("register user complete");
        res.status(200).send("userRegistrationSuccessful");
      })
      .catch((error) => {
        console.log("error registering user", error);
        res.status(500).send("userRegistrationFailed");
      });
  }
});

module.exports = router
