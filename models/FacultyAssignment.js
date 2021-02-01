const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'users' 
    },
    faculty: {
        type: Schema.Types.ObjectId, 
        ref: 'faculties' 
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

module.exports = mongoose.model("faculty-assignments", schema);