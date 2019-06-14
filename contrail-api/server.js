// server.js is the backend script for the server

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const firebase = require('firebase')
require('firebase/auth')
require('firebase/firestore')

const port = 3000
const host = '127.0.0.1'

// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyB9tiUIhIC_R9mAibHA71A8WM1Mt9euL0w",
	authDomain: "contrail-db.firebaseapp.com",
	databaseURL: "https://contrail-db.firebaseio.com",
	projectId: "contrail-db",
	storageBucket: "contrail-db.appspot.com",
	messagingSenderId: "342081308461",
	appId: "1:342081308461:web:7b8de20f963649bc"
}
firebase.initializeApp(firebaseConfig)

var db = firebase.firestore()

// parsing middleware
app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

app.use(express.static('public'), (req, res, next) => {
	console.log("static files sent")
	next()
})

app.post('/register', (req, res) => {
	var name = req.body.register_name
	var email = req.body.register_email
	//var userId = req.body.userId

	// save to db
	db.collection("users").add({
		//id: userId,
		name: name,
		email: email
	})
	.then((docRef) => {
		console.log("Document written with ID: ", docRef.id)
	})
	.catch((error) => {
		console.error("Error adding document: ", error)
	})


	res.send("Registration complete")
	// render app
	//res.render('app')
})

app.listen(port, host, () => console.log(`Express running on port ${port}`))