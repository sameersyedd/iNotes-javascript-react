const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({

    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    tag:{
        type: String
    }

},{timestamps:true})

module.exports = mongoose.model("note", notesSchema)