const mongoose = require("mongoose");
const Message = require("../models/Message");
const config = require("../config/config");

mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log("we are connected")
        }).catch(err => console.log(err));

const messages = [
    new Message({
        content: "Hello, Peter. I would like to talk a little bit about your submission.",
        author: "600fdd5ee23ff52318455076",
        room: "60128c893fe2ad2fa8431a2b",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
    new Message({
        content: "Do you have the time?",
        author: "600fdd5ee23ff52318455076",
        room: "60128c893fe2ad2fa8431a2b",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
    new Message({
        content: "Oh for sure",
        author: "601269a3772e8b310084bb18",
        room: "60128c893fe2ad2fa8431a2b",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
    new Message({
        content: "What would you like to talk about?",
        author: "601269a3772e8b310084bb18",
        room: "60128c893fe2ad2fa8431a2b",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
]

let counter = 0;
messages.forEach(message => {
    message.save()
        .then((createdMessage) => {
            counter++;
            console.log(counter);
            if (counter == messages.length) {
                mongoose.disconnect();
            }
        }).catch(err => console.log(err));
});