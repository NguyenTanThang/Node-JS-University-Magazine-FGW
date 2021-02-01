const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    docFileURL: {
        type: String,
        required: true
    },
    imageFileURL: {
        type: String,
        required: true
    },
    isSelected: {
        type: Boolean,
        default: false
    },
    contributor: { 
        type: Schema.Types.ObjectId, 
        ref: 'users' 
    },
    faculty: {
        type: Schema.Types.ObjectId, 
        ref: 'faculties' 
    },
    term: {
        type: Schema.Types.ObjectId, 
        ref: 'terms' 
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    last_modified_date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("contributions", schema);