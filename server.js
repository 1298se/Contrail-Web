// server.js is the backend script for the server

const express = require('express')
const bodyParser = require('body-parser');

const app = express()

var firebase = require('firebase')
require('firebase/auth')
var admin = require('firebase-admin')

const port = 3000
const host = '127.0.0.1'

// admin.initializeApp({
// 	credential: admin.credential.applicationDefault(),
// 	databaseURL: "https://contrail-db.firebaseio.com"
// })


// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyB9tiUIhIC_R9mAibHA71A8WM1Mt9euL0w",
	authDomain: "contrail-db.firebaseapp.com",
	databaseURL: "https://contrail-db.firebaseio.com",
	projectId: "contrail-db",
	storageBucket: "contrail-db.appspot.com",
	messagingSenderId: "342081308461",
	appId: "1:342081308461:web:7b8de20f963649bc"
};

firebase.initializeApp(firebaseConfig);

// parsing middleware
app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

// // allow CORS to communicate between different domains
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use('/', express.static('public'), (req, res, next) => {
	console.log("static files sent")
	next()
})

app.get('/', (req, res) => {
	console.log("root received")
	res.sendFile(__dirname + "/" + "../public/index.html")
	next()
})

app.post('/register', (req, res) => {
	var registerName = req.body.register_name
	var registerEmail = req.body.register_email
	var registerPassword = req.body.register_password

	// create user using Firebase Auth SDK
	firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword).catch(function(error) {
		var errorCode = error.code
		var errorMessage = error.message
		// handle error
		console.log("create user failed with error: ", errorMessage)
	})
})

app.post('/login', (req, res) => {
	var loginEmail = req.body.login_email
	var loginPassword = req.body.login_password

	firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).catch(function(error) {
		var errorCode = error.code
		var errorMessage = error.message
		// handle error
		console.log("login failed with error: ", errorMessage)
	})
})

app.get('/logout', (req, res) => {
	firebase.auth().signOut().then(function() {
	  // successful.
	}).catch(function(error) {
	  // error
	  console.log("logout failed with error error.message")
	});
})


app.listen(port, host, () => console.log(`Express running on port ${port}`))