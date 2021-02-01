const mongoose = require("mongoose");
const FacultyAssignment = require("../models/FacultyAssignment");
const config = require("../config/config");

mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log("we are connected")
        }).catch(err => console.log(err));

const facultyAssignments = [
    new FacultyAssignment({
        user: "600fdd5ee23ff52318455076",
        faculty: "60121ee8d067ef220c6c5f17",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
]

let counter = 0;
facultyAssignments.forEach(facultyAssignment => {
    facultyAssignment.save()
        .then((createdFacultyAssignment) => {
            counter++;
            console.log(counter);
            if (counter == facultyAssignments.length) {
                mongoose.disconnect();
            }
        }).catch(err => console.log(err));
});