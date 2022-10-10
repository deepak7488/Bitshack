const express = require("express")
const app = express()
const csvtojson = require('csvtojson')
// console.log("heeloo")
require("dotenv").config();
const port = process.env.PORT || 3000;
const Question = require("./model/LeetCode_Questions")
const mongoose = require("mongoose")
const uri = process.env.DB_URI;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(async () => {
    console.log("Connected Successfull")
}).catch((err) => console.log(err));
// var b = [9, 13, 7, 9, 11, 12]
// b = b.sort((x, y) => {
//     return x - y;
// })
// console.log(b)
// console.log(typeof b + "**")
app.get('', async (req, res) => {
    var data = await Question.find({});
    // data = data2.map((r) => r.toObject());
    // console.log(typeof data)
    // var filteredUsers = {}
    // console.log(req.query.company)
    // console.log(typeof req.query.sort)
    // console.log(req.query.sort)
    if (req.query.company) {
        data = data.filter(user => {
            for (let [key, value] of user.Companies.entries()) {
                if (key === req.query.company)
                    return true;
            }
            return false;
        });
    }
    // console.log(data)
    //var mysort = { company.g(req.query.company): 1 };
    if (req.query.sort === "true") {
        //console.log("Heloooo")
        data = data.sort(function (a, b) {
            //  console.log(a.Companies.get(req.query.company))
            //console.log(typeof a)
            return b.Companies.get(req.query.company) - a.Companies.get(req.query.company);
        })
    }
    res.send(data)
})
// app.get('/:company', async (req, res) => {
//     console.log(typeof req.params.company)
//     console.log(req.params.company)
//     const data = await Question.find({})
//     const filteredUsers = data.filter(user => {
//         for (let [key, value] of user.Companies.entries()) {
//             if (key === req.params.company)
//                 return true;
//         }
//         return false;
//     });
//     console.log(filteredUsers.length)
//     res.send(filteredUsers)
// })
app.listen(port, () => {
    console.log('server is up on port ' + port + "!")
})
// const client = mongoose.connection;
// (uri, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// })