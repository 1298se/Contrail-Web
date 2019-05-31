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



// // Initialize Firebase
// var firebaseConfig = {
// 	apiKey: "AIzaSyB9tiUIhIC_R9mAibHA71A8WM1Mt9euL0w",
// 	authDomain: "contrail-db.firebaseapp.com",
// 	databaseURL: "https://contrail-db.firebaseio.com",
// 	projectId: "contrail-db",
// 	storageBucket: "contrail-db.appspot.com",
// 	messagingSenderId: "342081308461",
// 	appId: "1:342081308461:web:7b8de20f963649bc"
// };

// firebase.initializeApp(firebaseConfig);


// // parsing middleware
// app.use(bodyParser.urlencoded({ extended:true}))
// app.use(bodyParser.json())


app.post('/register', (req, res) => {
	var register_name = req.body.register_name
	var register_email = req.body.register_email
	var register_password = req.body.register_password

	// do firebase auth queries
	admin.auth().createUser ({
		email: register_email,
		password: register_password,
		displayName: register_name
	})
	.then(function(userRecord) {
		console.log('Successfully created new user: ', userRecord.uid)

		res.send({
			"status" : "registration_success",
			"name" : userRecord.displayName,
			"email" : userRecord.email,
			"password" : userRecord.password,
			"UID" : userRecord.uid
		})
	})
	.catch(function(error) {
		console.log('Error creating new user: ', error)
		res.send({
			"status" : "registration_fail",
			"erro" : error
		})
	})

})

app.post('/login', (req, res) => {
	var login_email = req.body.login_email
	var login_password = req.body.login_password

	// do firebase auth queries
	admin.auth().getUserByEmail(login_email).then(function(userRecord)) {
		if(userRecord.password == )
	}
})


app.listen(port, () => console.log(`Express running on port ${port}`))


