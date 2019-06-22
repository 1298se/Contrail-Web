import bodyParser from "body-parser";
import express from "express";
import * as admin from "firebase-admin";
import * as path from "path";
import serviceAccount from "./ServiceAccountKey";

const app = express();
const port = 5000;
const host = "127.0.0.1";
// Init db
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
// parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  const authPage = path.join(__dirname, "public", "login.html");
  console.log(`Root route received, sending root: ${authPage}`);
  res.sendFile(authPage);
});

app.post("/api/login", (req, res) => {
  const token = req.body;
  if (token == null) {
    res.status(400).send("Bad Request: ID Token is null");
  } else {
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        res.status(200).send("userLoginSuccessful");
      })
      .catch((error) => {
        res.status(200).send("userLoginFailed")
        console.error(`/login - ${error}`);
      });
  }
});

app.post("/api/register", (req, res) => {
  const token = req.body;
  if (token == null) {
    res.status(400).send("Bad Request: ID Token is null");
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
        res.status(200).send("userRegistrationFailed");
      });
  }
});

app.listen(port, host, () => console.log(`Express running on port ${port}`));
