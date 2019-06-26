import bodyParser from 'body-parser';
import express from "express";
import * as admin from "firebase-admin";
import * as path from "path";
import authRoute from './routes/auth';

const app = express();
const port = 5000;
const host = "127.0.0.1";

// parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());

// use auth-api router
app.use('api/auth', authRoute);
.listen(port, host, () => console.log(`Express running on port ${port}`));
