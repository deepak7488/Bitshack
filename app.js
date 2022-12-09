const express = require("express")
require('./db/mongoose')
const quesRouter = require('./routers/question')
const user = require('./routers/user')
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(quesRouter)
app.use(user)


module.exports = app