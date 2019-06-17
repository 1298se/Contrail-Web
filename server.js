// server.js is the backend script for the server
const express = require('express')
const bodyParser = require('body-parser');
var admin = require('firebase-admin')

const app = express()
const port = 3000
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

app.use('/', express.static('public'), (req, res, next) => {
	console.log("static files sent")
	next()
})

app.get('/', (req, res, next) => {
    console.log("root route received")
    res.sendFile(__dirname + "/" + "public/index.html")
    next()
})

app.post('/register', (req, res) => {

	console.log(req.body)
	const token = req.body
	// const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0OGYzZjk4N2IxNzMxOWZlZDhjZDc2ODNmNTIyNWEyOTY0YzY5OWQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiYWRmYWYiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29udHJhaWwtZGIiLCJhdWQiOiJjb250cmFpbC1kYiIsImF1dGhfdGltZSI6MTU2MDYyNDI4MiwidXNlcl9pZCI6IkQ0TXZQRHptcWdXNE5xMVN3WThGZ2tDUGNZVTIiLCJzdWIiOiJENE12UER6bXFnVzROcTFTd1k4RmdrQ1BjWVUyIiwiaWF0IjoxNTYwNjI0MjgzLCJleHAiOjE1NjA2Mjc4ODMsImVtYWlsIjoiYWRzZmFkZmRhZmRmQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhZHNmYWRmZGFmZGZAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.qigRKPCGZ649dV8wQ7TbrZUw3-NeTgopXa3NTj9oHn5rIuvnSkXzzunhu_8X5ix56XUAlCql3RnEsn8y_AXHqANqKt_ZfVMk_5hVGbb1eXTpPfYNduVwOKjPkadMSt5Tm0bfZdeNUmyd8Ik4O1NSdWjdUW99pOHDovLwnvqdzo3ghaxQYbXzGsC-uEbB40LSs4753G2dI9PLdy-5qY_SdUX8iEbz3n8kteCy2BZkSNc4lULpDnIyNBLXNOS2-W7wB9sV4ZriLITkSKBdkTl45HJ9gJ3s-uZeG8lL4MV-vBWY3SWnfum-vj_e3gS1Sgk6xUgYWxwnZH8kqUe3yQHs0w"
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
			res.render('/public/app')
		}).catch(function(error) {
			console.log("error validating user")
			res.status(403).send("error: token validation failed")
		})
})

app.listen(port, host, () => console.log(`Express running on port ${port}`))
 