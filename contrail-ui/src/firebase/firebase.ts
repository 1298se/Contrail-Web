import * as firebase from "firebase";
import { FirebaseConfig } from "./config/dev-config";

firebase.initializeApp(FirebaseConfig);

export const authRef = firebase.auth();
