const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'users' 
    },
    room: {
        type: Schema.Types.ObjectId, 
        ref: 'message-rooms' 
    },
    content: {
        type: String,
        required: true
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

module.exports = mongoose.model("messages", schema);