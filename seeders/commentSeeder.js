const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const config = require("../config/config");

mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log("we are connected")
        }).catch(err => console.log(err));

const comments = [
    new Comment({
        content: "This is quite good.",
        contribution: "60126d203c4e020a28135b25",
        user: "600fdd5ee23ff52318455076",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
]

let counter = 0;
comments.forEach(comment => {
    comment.save()
        .then((createdComment) => {
            counter++;
            console.log(counter);
            if (counter == comments.length) {
                mongoose.disconnect();
            }
        }).catch(err => console.log(err));
});