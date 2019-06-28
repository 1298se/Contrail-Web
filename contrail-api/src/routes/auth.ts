import express from "express";
import app from "../firebaseapp";

const router = express.Router();
const db = app.firestore();

router.post("/", async (req, res) => {
  const token = req.body;
  if (token == null) {
    res.status(401).send("Bad Request: ID Token is null");
  } else {
    try {
      const decodedToken = await app.auth().verifyIdToken(token);
      res.status(200).send(decodedToken);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

router.post("/register", async (req, res) => {
  const token = req.body;
  if (token === null) {
    res.status(401).send("Bad Request: ID Token is null");
  } else {
    try{
      const decodedToken = await app.auth().verifyIdToken(token);
      const user = await app.auth().getUser(decodedToken.uid);
      const newUserRef = db.collection("users").doc(user.uid);
      const result = await newUserRef.set({
        displayName: user.displayName,
        documents: {
          owned: [],
          sharedToUser: [],
        },
        email: user.email,
        profileImageUri: null,
      });
      res.status(200).send(result);
    } catch(err){
      res.status(500).send(err);
    }
  }
});

export default router;
