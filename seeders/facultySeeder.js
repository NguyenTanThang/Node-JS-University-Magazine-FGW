const mongoose = require("mongoose");
const Faculty = require("../models/Faculty");
const config = require("../config/config");

mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log("we are connected")
        }).catch(err => console.log(err));

const faculties = [
    new Faculty({
        name: "Art and Science",
        created_date: Date.now()
    }),
    new Faculty({
        name: "Law",
        created_date: Date.now()
    }),
    new Faculty({
        name: "Medicine",
        created_date: Date.now()
    }),
    new Faculty({
        name: "Music",
        created_date: Date.now()
    }),
    new Faculty({
        name: "Dentistry",
        created_date: Date.now()
    })
]

let counter = 0;
faculties.forEach(faculty => {
    faculty.save()
        .then((createdFaculty) => {
            counter++;
            console.log(counter);
            if (counter == faculties.length) {
                mongoose.disconnect();
            }
        }).catch(err => console.log(err));
});