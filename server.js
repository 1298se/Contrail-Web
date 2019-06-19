// server.js is the backend script for the server
const express = require('express')
const bodyParser = require('body-parser')
const admin = require('firebase-admin')
const path = require('path')

const app = express()
const port = 5000
const host = '127.0.0.1'

const serviceAccount = require("./ServiceAccountKey")

// Init db
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

let db = admin.firestore()

// parsing middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
	const auth_page = path.join(__dirname, 'public', 'login.html')
	console.log(`Root route received, sending root: ${auth_page}`)
	res.sendFile(auth_page)
})

app.post('/login', (req, res) => {
	console.log("receiving from /login")
	const token = req.body
	if (token == null) {
		console.log("error getting token")
		res.status(400).send('Bad Request: ID Token is null')
	} else {
		admin.auth().verifyIdToken(token).then(function (decodedToken) {
			res.sendStatus(200)
		}).catch(function (error) {
			console.log("error logging in user")
		})
	}
})

app.post('/register', (req, res) => {
	console.log("receiving from /register")
	const token = req.body
	if (token == null) {
		console.log("error getting token")
		res.status(400).send('Bad Request: ID Token is null')
	}
	else {
		admin.auth().verifyIdToken(token).then(function (decodedToken) {
			return admin.auth().getUser(decodedToken.uid)
		}).then(function (userRecord) {
			let new_user = db.collection('users').doc(userRecord.uid)
			new_user.set({
				userId: userRecord.uid,
				displayName: userRecord.displayName,
				email: userRecord.email,
				profileImageUri: null,
				documents: {
					owned: [],
					sharedToUser: []
				}
			})
		}).catch(function (error) {
			console.log("error registering user", error)
			res.send("error: registration")
		})

		res.sendStatus(200)
		console.log("register user complete")
	}
})

// verify token and render app.html
app.get('/app', (req, res) => {
	console.log("app route received")
	res.sendFile(path.join(__dirname, 'main', 'public', 'index.html'))
})

app.listen(port, host, () => console.log(`Express running on port ${port}`))
