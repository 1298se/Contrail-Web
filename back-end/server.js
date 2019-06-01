// server.js is the backend script for the server

const express = require('express')
const bodyParser = require('body-parser');

const app = express()

var firebase = require('firebase')
require('firebase/auth')
var admin = require('firebase-admin')


const port = 3000


admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: "https://contrail-db.firebaseio.com"
})


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

app.post('/register', (req, res) => {
	var register_name = req.body.register_name
	var register_email = req.body.register_email
	var register_password = req.body.register_password

	// create user using Firebase Auth SDK
	firebase.auth().createUserWithEmailAndPassword(register_email, register_password).catch(function(error) {
		var errorCode = error.code
		var errorMessage = error.message
		// handle error
		console.log("create user failed with error: ", errorMessage)
	})
})

app.post('/login', (req, res) => {
	var login_email = req.body.login_email
	var login_password = req.body.login_password

	firebase.auth().signInWithEmailAndPassword(login_email, login_password).catch(function(error) {
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


app.listen(port, () => console.log(`Express running on port ${port}`))


