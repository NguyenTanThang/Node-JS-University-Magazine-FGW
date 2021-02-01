const mongoose = require("mongoose");
const UserRole = require("../models/UserRole");
const config = require("../config/config");

mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log("we are connected")
        }).catch(err => console.log(err));

const userRoles = [
    new UserRole({
        role: "Manager",
        created_date: Date.now()
    }),
    new UserRole({
        role: "Coordinator",
        created_date: Date.now()
    }),
    new UserRole({
        role: "Student",
        created_date: Date.now()
    }),
    new UserRole({
        role: "Admin",
        created_date: Date.now()
    }),
    new UserRole({
        role: "Guest",
        created_date: Date.now()
    })
]

let counter = 0;
userRoles.forEach(userRole => {
    userRole.save()
        .then((createdUserRole) => {
            counter++;
            console.log(counter);
            if (counter == userRoles.length) {
                mongoose.disconnect();
            }
        }).catch(err => console.log(err));
});