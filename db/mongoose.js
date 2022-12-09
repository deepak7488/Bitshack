const mongoose = require("mongoose")
require('dotenv').config()
const uri = process.env.DB_URI;

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(async () => {
    console.log("Connected Successfull")
}).catch((err) => console.log(err));