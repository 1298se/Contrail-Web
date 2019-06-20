"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var admin = __importStar(require("firebase-admin"));
var path = __importStar(require("path"));
var ServiceAccountKey_1 = __importDefault(require("./ServiceAccountKey"));
var app = express_1.default();
var port = 5000;
var host = "127.0.0.1";
// Init db
admin.initializeApp({
    credential: admin.credential.cert(ServiceAccountKey_1.default),
});
var db = admin.firestore();
// parsing middleware
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.text());
app.use(body_parser_1.default.json());
app.use(express_1.default.static("public"));
app.get("/", function (req, res) {
    var authPage = path.join(__dirname, "public", "login.html");
    console.log("Root route received, sending root: " + authPage);
    res.sendFile(authPage);
});
app.post("/login", function (req, res) {
    var token = req.body;
    if (token == null) {
        res.status(400).send("Bad Request: ID Token is null");
    }
    else {
        admin
            .auth()
            .verifyIdToken(token)
            .then(function (decodedToken) {
            res.sendStatus(200);
        })
            .catch(function (error) {
            console.error("/login - " + error);
        });
    }
});
app.post("/register", function (req, res) {
    var token = req.body;
    if (token == null) {
        res.status(400).send("Bad Request: ID Token is null");
    }
    else {
        admin
            .auth()
            .verifyIdToken(token)
            .then(function (decodedToken) {
            return admin.auth().getUser(decodedToken.uid);
        })
            .then(function (userRecord) {
            var newUser = db.collection("users").doc(userRecord.uid);
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
        })
            .catch(function (error) {
            console.log("error registering user", error);
            res.send("error: registration");
        });
        res.sendStatus(200);
        console.log("register user complete");
    }
});
// verify token and render app.html
app.get("/app", function (req, res) {
    console.log("app route received");
    res.sendFile(path.join(__dirname, "main", "public", "index.html"));
});
app.listen(port, host, function () { return console.log("Express running on port " + port); });
