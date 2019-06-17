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
app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.text())
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
	const auth_page = path.join(__dirname, 'public', 'login.html')
	console.log(`Root route received, sending root: ${auth_page}`)
    res.sendFile(auth_page)
})

app.post('/register', (req, res) => {

	const token = req.body
	if(!token) {
		console.log("error getting token")
		res.status(400).send('Bad Request')
	}
	else {
		admin.auth().verifyIdToken(token)
			.then(function(decodedToken) {
				return admin.auth().getUser(decodedToken.uid)
			})
			.then(function(userRecord) {
				let new_user = db.collection('users').doc(userRecord.uid)
				new_user.set({
					name: userRecord.displayName,
					email: userRecord.email,
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
	}
})


// verify token and render app.html
app.get('/app', (req, res) => {
	var token = req.body.idToken
	admin.auth().verifyIdToken(token)
		.then(function(decodedToken) {
			res.sendFile(path.join(__dirname, 'main', 'build', 'index.html'))
		}).catch(function(error) {
			console.log("error validating user")
			res.status(403).send("error: token validation failed")
		})
})

app.listen(port, host, () => console.log(`Express running on port ${port}`))
 