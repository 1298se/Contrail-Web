// server.js is the backend script for the server
const app = express()
const express = require('express')
const bodyParser = require('body-parser');
var admin = require('firebase-admin')

const port = 3000
const host = '127.0.0.1'

const serviceAccount = require("C:\\Users\\David\\Downloads\\contrail-db-firebase-adminsdk-vg7u5-38482023bf.json")

// Init db
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

let db = admin.firestore()

// parsing middleware
app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

app.use('/', express.static('public'), (req, res, next) => {
	console.log("static files sent")
	next()
})

app.get('/register', (req, res) => {
	try {
	const token = req.body.idToken
	}
	catch(error) {
		console.log("error getting token ", error)
		res.status(400).send('Bad Request')
	}
	admin.auth().verifyIdToken(token)
		.then(function(decodedToken) {
			return admin.auth().getUser(decodedToken.uid)
		})
		.then(function(userRecord) {
			let new_user = db.collection('users').doc(userId)
			new_user.set({
				name: userRecord.displayName,
				email: userRecord.email,
				id: userRecord.uid,
				owned: [],
				shared: {
					sharedByUser: [],
					sharedToUser: []
				}
			})
	  })
		.catch(function(error) {
			console.log("error registering user", error)
			res.send("error: registration")
		})

	res.sendStatus(200)
	console.log("register user complete")
})


// verify token and render app.html
app.get('/app', (req, res) => {
	var token = req.body.idToken
	admin.auth().verifyIdToken(token)
		.then(function(decodedToken) {
			res.render('/public/app')
		}).catch(function(error) {
			console.log("error validating user")
			res.send("error: token validation failed")
		})
})

app.listen(port, host, () => console.log(`Express running on port ${port}`))
 