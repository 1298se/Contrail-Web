// server.js is the backend script for the server

const express = require('express')
const app = express()

const port = 3000

// parsing middleware
app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())


app.post('/register', (req, res) => {
	var register_name = req.body.register_name
	var register_email = req.body.register_email
	var register_password = req.body.register_password

	// do firebase database queries
})

app.post('/login', (req, res) => {
	var login_name = req.body.register_name
	var login_email = req.body.login_email
	var login_password = req.body.login_password

	// do firebase database queries
})


app.listen(port, () => console.log(`Express running on port ${port}`))
