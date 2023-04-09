const express = require("express")
const router = new express.Router();
const Question = require("../models/LeetCode_Questions")
router.get('/getquestions', async (req, res) => {
    var data = await Question.find();
    if (req.query.company) {
        data = data.filter(user => {
            for (let [key, value] of user.Companies.entries()) {
                if (key === req.query.company)
                    return true;
            }
            return false;
        });
        if (req.query.sort === "true") {
            data = data.sort(function (a, b) {
                return b.Companies.get(req.query.company) - a.Companies.get(req.query.company);
            })
        }
    }
    if (req.query.topics) {
        lol = []
        data = data.filter(user => {
            {
                let map = JSON.parse(user.Topics[0].replace(/'/g, '"'))
                map.forEach(function (value) {
                    if (value === req.query.topics) {
                        lol.push(user)
                        return true;
                    }

                })
                return false;
            }
        });
        console.log(lol.length)
        data = lol
        if (req.query.sort === "true") {
            data = data.sort(function (a, b) {
                return b.Companies.get(req.query.company) - a.Companies.get(req.query.company);
            })
        }
    }


    // .limit(req.query.limit).skip(req.query.skip)
    if (req.query.skip && req.query.limit) {
        // console.log(data.slice(req.query.skip, req.query.skip + req.query.limit).length)
        // console.log(req.query.skip + " " + req.query.skip + req.query.limit)
        data = data.slice(req.query.skip, parseInt(req.query.skip) + parseInt(req.query.limit))
    }

    res.send(data)
})
module.exports = router
