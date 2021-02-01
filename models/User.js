const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    role: { 
        type: Schema.Types.ObjectId, 
        ref: 'user-roles' 
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

module.exports = mongoose.model("users", schema);