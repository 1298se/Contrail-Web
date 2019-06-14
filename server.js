// server.js is the backend script for the server

const express = require('express')
const bodyParser = require('body-parser');

const app = express()

var firebase = require('firebase')
require('firebase/auth')
var admin = require('firebase-admin')

const port = 3000
const host = '127.0.0.1'

const serviceAccount = require("C:\\Users\\David\\Downloads\\contrail-db-firebase-adminsdk-vg7u5-38482023bf.json")




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


// Init db
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

let db = admin.firestore()

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

// app.get('/', (req, res) => {
// 	console.log("root received")
// 	res.sendFile(__dirname + "/" + "../public/index.html")
// 	next()
// })

app.get('/register', (req, res) => {
	var name = "dave"
	var email = "myemail"
	var userId = "1"

	let new_user = db.collection('users').doc(userId)

	new_user.set({
		name: name,
		email: email,
		id: userId,
		owned: [
			"doc1",
			"doc2"
		],
		shared: {
			sharedByUser: [
				"doc1"
			],
			sharedToUser: [
				"doc4",
				"doc5"
			]
		}
	})

	console.log("register user complete")
	res.send("register")
	// res.redirect('/app')
})


// verify token and render app.html
app.get('/app', (req, res) => {
	var token = req.body.token
	admin.auth().verifyIdToken(token)
		.then(function(decodedToken) {
			res.render('/public/app')
		}).catch(function(error) {
			console.log("error validating user")
			// send error msg to client
			res.send("error: token validation failed")
		})
})

app.listen(port, host, () => console.log(`Express running on port ${port}`))
