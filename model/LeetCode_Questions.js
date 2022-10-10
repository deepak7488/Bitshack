const mongoose = require('mongoose')
const Double = require('@mongoosejs/double');
const questionsSchema = new mongoose.Schema({
    Problem_Code: {
        type: Number,
        required: true,
        unique: true,

    },
    Problem_Name: {
        type: String,
        unique: true,
        required: true,

    },
    Difficulty_Level: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],

    },
    Topics: [{
        type: String,
        require: true,

    }],
    Acceptance_Percentage: {
        type: Double,
        required: true,

    },
    Popularity: {
        type: Double,
        required: true,

    },
    Companies: {
        type: Map,
        of: Number,

    },
    Problem_Link: {
        type: String,
    }
},
    {
        timestamps: true
    }
)
const Question = mongoose.model('Question', questionsSchema)
module.exports = Question