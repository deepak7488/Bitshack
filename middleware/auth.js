const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req, res, next) => {
    try {
        //console.log("H3ello")
        const token = req.header('Authorization').replace('Bearer ', '')
        //console.log("H3ello")
        const decoded = jwt.verify(token, process.env.JWT_SECRETS)
        // console.log(decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        //console.log(user)
        req.user = user
        req.token = token
        next()

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}
module.exports = auth