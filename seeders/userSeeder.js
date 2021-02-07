const mongoose = require("mongoose");
const User = require("../models/User");
const config = require("../config/config");
const {
    encrypt
} = require("../utils/encryptor");

mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log("we are connected")
        }).catch(err => console.log(err));

        /*
const users = [
    new User({
        email: "student1@student.com",
        password: "123456",
        username: "Student 1",
        role: "600fbbf2ad2e6e119cd5edfa",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
    new User({
        email: "student2@student.com",
        password: "123456",
        username: "Student 2",
        role: "600fbbf2ad2e6e119cd5edfa",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
    new User({
        email: "student3@student.com",
        password: "123456",
        username: "Student 3",
        role: "600fbbf2ad2e6e119cd5edfa",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
    new User({
        email: "manager1@manager.com",
        password: "123456",
        username: "Manager 1",
        role: "600fbbf2ad2e6e119cd5edf8",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
    new User({
        email: "guest1@guest.com",
        password: "123456",
        username: "Guest 1",
        role: "600fbbf2ad2e6e119cd5edfc",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
]
*/

const users = [
    new User({
        email: "coordinator6@coordinator.com",
        password: "123456",
        username: "Coordinator 6",
        role: "600fbbf2ad2e6e119cd5edf9",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
    new User({
        email: "admin4@admin.com",
        password: "123456",
        username: "Admin 4",
        role: "600fbbf2ad2e6e119cd5edfb",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
]

let counter = 0;
users.forEach(user => {
    user.password = encrypt(user.password);
    user.save()
        .then((createdUser) => {
            counter++;
            console.log(counter);
            if (counter == users.length) {
                mongoose.disconnect();
            }
        }).catch(err => console.log(err));
});