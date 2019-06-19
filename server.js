// server.js is the backend script for the server
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var authentication = require('./routes/authentication')
var main = require('./routes/main')

const app = express()
const port = 5000
const host = '127.0.0.1'

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

app.use('/', authentication)
app.use('/', main)

app.listen(port, host, () => console.log(`Express running on port ${port}`))
