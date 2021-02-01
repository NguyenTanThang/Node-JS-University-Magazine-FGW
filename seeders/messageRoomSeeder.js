const mongoose = require("mongoose");
const MessageRoom = require("../models/MessageRoom");
const config = require("../config/config");

mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log("we are connected")
        }).catch(err => console.log(err));

const messageRooms = [
    new MessageRoom({
        sender: "600fdd5ee23ff52318455076",
        receiver: "601269a3772e8b310084bb18",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
]

let counter = 0;
messageRooms.forEach(messageRoom => {
    messageRoom.save()
        .then((createdMessageRoom) => {
            counter++;
            console.log(counter);
            if (counter == messageRooms.length) {
                mongoose.disconnect();
            }
        }).catch(err => console.log(err));
});