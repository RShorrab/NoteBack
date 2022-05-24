const mongoose = require('mongoose')
const noteSchema = mongoose.Schema({
    title: String, 
    description: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true}) 

const noteModel = mongoose.model('note', noteSchema)
module.exports = {noteModel}