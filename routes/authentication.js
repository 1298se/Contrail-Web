const express = require('express')
var router = express.Router()
const admin = require('firebase-admin')

const serviceAccount = require("../ServiceAccountKey")
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})
let db = admin.firestore()

router.post('/login', (req, res) => {
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
router.post('/register', (req, res) => {
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

module.exports = router
