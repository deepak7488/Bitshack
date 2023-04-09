const express = require("express")
require('./db/mongoose')
var path = require("path")
const quesRouter = require('./routers/question')
const user = require('./routers/user')
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(quesRouter)
app.use(user)
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/Login.html'));
});
app.get('/user', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/home.html'));
});
app.get('/analytics', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/analytics.html'));
});
module.exports = app