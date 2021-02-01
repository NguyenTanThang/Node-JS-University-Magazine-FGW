const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    content: {
        type: String,
        required: true
    },
    contribution: {
        type: Schema.Types.ObjectId, 
        ref: 'contributions' 
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'users' 
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

module.exports = mongoose.model("comments", schema);