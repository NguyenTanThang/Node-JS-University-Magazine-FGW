const mongoose = require("mongoose");
const Contribution = require("../models/Contribution");
const config = require("../config/config");

mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log("we are connected")
        }).catch(err => console.log(err));

const contributions = [
    new Contribution({
        title: "Magazine 1 of Student 1",
        docFileURL: "https://firebasestorage.googleapis.com/v0/b/chat-test-d1f4c.appspot.com/o/Library%20Functions.docx?alt=media&token=d92b196e-85df-446a-b5bb-c33e7dc1b295",
        imageFileURL: "https://i1.wp.com/thesource.metro.net/wp-content/uploads/2020/03/Subway19March2019-11-scaled.jpg?resize=863%2C574&ssl=1",
        isSelected: true,
        contributor: "601269a3772e8b310084bb18",
        faculty: "60121ee8d067ef220c6c5f17",
        term: "601225444321d305587f4870",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
    new Contribution({
        title: "Magazine 2 of Student 1",
        docFileURL: "https://firebasestorage.googleapis.com/v0/b/chat-test-d1f4c.appspot.com/o/Metro%20Tech.docx?alt=media&token=5addc004-e4e2-4719-88f9-804bb78f3ac8",
        imageFileURL: "https://bsmedia.business-standard.com/_media/bs/img/article/2020-09/06/full/1599409612-7047.jpg",
        isSelected: true,
        contributor: "601269a3772e8b310084bb18",
        faculty: "60121ee8d067ef220c6c5f17",
        term: "601225444321d305587f4870",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
    new Contribution({
        title: "Magazine 1 of Student 2",
        docFileURL: "https://firebasestorage.googleapis.com/v0/b/chat-test-d1f4c.appspot.com/o/Property%20Website.docx?alt=media&token=89bd30c0-280e-4f3a-8d3b-bdc0c03ed665",
        imageFileURL: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-210248,resizemode-1,msid-66419131/industry/transportation/railways/15-more-cities-will-soon-have-metro-network-union-minister-puri.jpg",
        isSelected: true,
        contributor: "601269a3772e8b310084bb19",
        faculty: "60121ee8d067ef220c6c5f18",
        term: "601225444321d305587f4870",
        created_date: Date.now(),
        last_modified_date: Date.now(),
    }),
]

let counter = 0;
contributions.forEach(contribution => {
    contribution.save()
        .then((createdContribution) => {
            counter++;
            console.log(counter);
            if (counter == contributions.length) {
                mongoose.disconnect();
            }
        }).catch(err => console.log(err));
});