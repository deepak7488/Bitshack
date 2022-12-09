const express = require("express")
const router = new express.Router();
const Question = require("../models/LeetCode_Questions")
router.get('/hr', async (req, res) => {
    var data = await Question.find({});
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
    res.send(data)
})
module.exports = router
