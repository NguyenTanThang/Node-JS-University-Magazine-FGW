const mongoose = require("mongoose");
const Term = require("../models/Term");
const config = require("../config/config");

const date = new Date();

var twoWeeksFromNow = new Date(Date.now() + 12096e5);
var oneWeeksFromNow = date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log("we are connected")
        }).catch(err => console.log(err));

const terms = [
    new Term({
        name: "Academic Year 1",
        closureDate: oneWeeksFromNow,
        finalClosureDate: twoWeeksFromNow,
        created_date: Date.now()
    }),
    new Term({
        name: "Academic Year 2",
        closureDate: oneWeeksFromNow,
        finalClosureDate: twoWeeksFromNow,
        created_date: Date.now()
    }),
    new Term({
        name: "Academic Year 3",
        closureDate: oneWeeksFromNow,
        finalClosureDate: twoWeeksFromNow,
        created_date: Date.now()
    }),
    new Term({
        name: "Academic Year 4",
        closureDate: oneWeeksFromNow,
        finalClosureDate: twoWeeksFromNow,
        created_date: Date.now()
    }),
    new Term({
        name: "Academic Year 5",
        closureDate: oneWeeksFromNow,
        finalClosureDate: twoWeeksFromNow,
        created_date: Date.now()
    }),
]

let counter = 0;
terms.forEach(term => {
    term.save()
        .then((createdTerm) => {
            counter++;
            console.log(counter);
            if (counter == terms.length) {
                mongoose.disconnect();
            }
        }).catch(err => console.log(err));
});