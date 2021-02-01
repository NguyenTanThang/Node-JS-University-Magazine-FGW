const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    sender: {
        type: Schema.Types.ObjectId, 
        ref: 'users' 
    },
    receiver: {
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

module.exports = mongoose.model("message-rooms", schema);