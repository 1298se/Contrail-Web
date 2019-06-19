const express = require('express')
var router = express.Router()
const path = require('path')

// verify token and render app.html
router.get('/app', (req, res) => {
	console.log("app route received")
	res.sendFile(path.join(__dirname, '/../','main', 'public', 'index.html'))
})


module.exports = router