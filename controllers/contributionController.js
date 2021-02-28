require('dotenv').config()
const Contribution = require("../models/Contribution");
const User = require("../models/User");
const Faculty = require("../models/Faculty");
const FacultyAssignment = require("../models/FacultyAssignment");
const Term = require("../models/Term");
const {sendEmail} = require("../utils/emailSender");
const {getAllCommentByContributionID} = require("../requests/commentRequests");
const routeName = `contribution`;

const getAllContributions = async (req, res) => {
    try {
        const contributions = await Contribution.find()
        .populate('contributor')
        .populate('faculty')
        .populate('term')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: contributions,
            count: contributions.length
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getContributionsWithoutCommentReport = async (req, res) => {
    try {
        const contributions = await Contribution.find()
        .populate('contributor')
        .populate('faculty')
        .populate('term')
        .exec();
        let returnedList = [];

        for (let i = 0; i < contributions.length; i++) {
            const contribution = contributions[i];
            const comments = await getAllCommentByContributionID(contribution._id);
            if (comments.length <= 0) {
                returnedList.push(contribution);
            }
        }

        return res.json({
            status: 200,
            success: true,
            data: returnedList,
            count: returnedList.length
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getNumberOfContributionsReport = async (req, res) => {
    try {
        const terms = await Term.find();
        const faculties = await Faculty.find();
        let returnedList = [];
        let termsList = [];
        let facultiesList = [];

        for (let i = 0; i < terms.length; i++) {
            const term = terms[i];
            for (let j = 0; j < faculties.length; j++) {
                const faculty = faculties[j];
                const contributionsInOneTerm = await Contribution.find({
                    term: term._id
                })
                const contributions = await Contribution.find({
                    term: term._id,
                    faculty: faculty._id
                })
                .populate('contributor')
                .populate('faculty')
                .populate('term')
                .exec();
                if (contributions.length > 0) {
                    const percentage = (contributions.length / contributionsInOneTerm.length) * 100;
                    returnedList.push({
                        contributions,
                        count: contributions.length,
                        percentage: Math.round(percentage),
                        faculty,
                        term
                    })
                    if (!termsList.includes(term.name)) {
                        termsList.push(term.name);
                    }
                    if (!facultiesList.includes(faculty.name)) {
                        facultiesList.push(faculty.name);
                    }
                }
            }
        }

        return res.json({
            status: 200,
            success: true,
            data: {
                contributions: returnedList,
                terms: termsList,
                faculties: facultiesList
            }
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getNumberOfContributorsReport = async (req, res) => {
    try {
        const terms = await Term.find();
        let returnedList = [];
        let termsList = [];

        for (let i = 0; i < terms.length; i++) {
            const term = terms[i];
            const contributions = await Contribution.find({
                term: term._id
            })
            .populate('contributor')
            .populate('faculty')
            .populate('term')
            .exec();
            if (contributions.length > 0) {
                let contributors = [];
                for (let j = 0; j < contributions.length; j++) {
                    const contribution = contributions[j];
                    if (!contributors.includes(contribution.contributor)) {
                        contributors.push(contribution.contributor)
                    }
                }
                returnedList.push({
                    contributors,
                    contributorCount: contributors.length,
                    term
                })
                if (!termsList.includes(term.name)) {
                    termsList.push(term.name);
                }
            }
        }

        return res.json({
            status: 200,
            success: true,
            data: {
                contributions: returnedList,
                terms: termsList
            }
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getContributionByID = async (req, res) => {
    try {
        const {contributionID} = req.params;
        const contribution = await Contribution.findById(contributionID)
        .populate('contributor')
        .populate('faculty')
        .populate('term')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: contribution
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getContributionByUserID = async (req, res) => {
    try {
        const {userID} = req.params;
        const contributions = await Contribution.find({contributor: userID})
        .populate('contributor')
        .populate('faculty')
        .populate('term')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: contributions,
            count: contributions.length
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getContributionByFacultyID = async (req, res) => {
    try {
        const {facultyID} = req.params;
        const contributions = await Contribution.find({faculty: facultyID})
        .populate('contributor')
        .populate('faculty')
        .populate('term')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: contributions,
            count: contributions.length
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const addContribution = async (req, res) => {
    try {
        const {title, docFileURL, imageFileURL, contributor, faculty, term} = req.body;
        console.log(req.body);

        const existedTerm = await Term.findById(term);
        const existedFaculty = await Faculty.findById(faculty);
        const existedUser = await User.findById(contributor);

        if (!existedTerm || !existedFaculty || !existedUser) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `Invalid crucial data such as term, faculty or contributor`
            })
        }

        const currentTime = new Date().getTime();
        const closureTime = new Date(existedTerm.closureDate).getTime();

        // To calculate the time difference of two dates 
        const Difference_In_Time = currentTime - closureTime; 
            
        // To calculate the no. of days between two dates 
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

        if (Difference_In_Days >= 14) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This term has reached the closure date for new entries`
            });
        }

        let contribution = await new Contribution({
            title, docFileURL, imageFileURL, contributor, faculty, term,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();
        contribution = await Contribution.findById(contribution._id)
        .populate('contributor')
        .populate('faculty')
        .populate('term')
        .exec();
        await sendNotificationEmailContribution(contribution);

        return res.json({
            status: 200,
            success: true,
            data: contribution,
            message: `Successfully created a ${routeName}`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const editContribution = async (req, res) => {
    try {
        const {contributionID} = req.params;
        const updatedContribution = req.body;

        const existedContribution = await Contribution.findById(contributionID)
        .populate("term")
        .exec();

        if (!existedContribution) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This ${routeName} does not exist`
            })
        }

        const currentTime = new Date().getTime();
        const closureTime = new Date(existedContribution.term.finalClosureDate).getTime();

        // To calculate the time difference of two dates 
        const Difference_In_Time = currentTime - closureTime; 
            
        // To calculate the no. of days between two dates 
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

        if (Difference_In_Days >= 14) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This term has reached the final closure date for any modification`
            });
        }

        let contribution = await Contribution.findByIdAndUpdate(contributionID, {...updatedContribution, last_modified_date: Date.now()});

        contribution = await Contribution.findById(contributionID)
        .populate('contributor')
        .populate('faculty')
        .populate('term')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: contribution,
            message: `Successfully updated a ${routeName}`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const deleteContribution = async (req, res) => {
    try {
        const {contributionID} = req.params;

        const existedContribution = await Contribution.findById(contributionID);

        if (!existedContribution) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This ${routeName} does not exist`
            })
        }

        const contribution = await Contribution.findByIdAndDelete(contributionID);

        return res.json({
            status: 200,
            success: true,
            data: contribution,
            message: `Successfully deleted a ${routeName}`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const sendNotificationEmailContribution = async (contribution) => {
  const {
    _id,
    contributor,
    title,
    faculty
  } = contribution;

  const contributionLink = `${process.env.CLIENT_URL}/contributions/details/${_id}`;

  const facultyAssignments = await FacultyAssignment.find({
      faculty: faculty._id
  })
.populate('user')
.populate('faculty')
.exec();

  facultyAssignments.forEach(async facultyAssignment => {
      const facultyAssignmentsUser = facultyAssignment.user;
      const user = await User.findById(facultyAssignmentsUser._id)
        .populate('role')
        .exec();
      if (user.role.role === "Coordinator") {
        let mailOptions = {
            from: 'letsflix360@gmail.com', // TODO: email sender
            to: user.email, // TODO: email receiver
            subject: "UoG Contribution Uploaded Notification",
            html: `
                <!doctype html>
                <html>
                <head>
                    <meta name="viewport" content="width=device-width" />
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <title>Simple Transactional Email</title>
                    <style>
                    /* -------------------------------------
                        GLOBAL RESETS
                    ------------------------------------- */
                    
                    /*All the styling goes here*/
                    
                    img {
                        border: none;
                        -ms-interpolation-mode: bicubic;
                        max-width: 100%; 
                    }
                
                    body {
                        background-color: #f6f6f6;
                        font-family: sans-serif;
                        -webkit-font-smoothing: antialiased;
                        font-size: 14px;
                        line-height: 1.4;
                        margin: 0;
                        padding: 0;
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%; 
                    }
                
                    table {
                        border-collapse: separate;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        width: 100%; }
                        table td {
                        font-family: sans-serif;
                        font-size: 14px;
                        vertical-align: top; 
                    }
                
                    /* -------------------------------------
                        BODY & CONTAINER
                    ------------------------------------- */
                
                    .body {
                        background-color: #f6f6f6;
                        width: 100%; 
                    }
                
                    /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
                    .container {
                        display: block;
                        margin: 0 auto !important;
                        /* makes it centered */
                        max-width: 580px;
                        padding: 10px;
                        width: 580px; 
                    }
                
                    /* This should also be a block element, so that it will fill 100% of the .container */
                    .content {
                        box-sizing: border-box;
                        display: block;
                        margin: 0 auto;
                        max-width: 580px;
                        padding: 10px; 
                    }
                
                    /* -------------------------------------
                        HEADER, FOOTER, MAIN
                    ------------------------------------- */
                    .main {
                        background: #ffffff;
                        border-radius: 3px;
                        width: 100%; 
                    }
                
                    .wrapper {
                        box-sizing: border-box;
                        padding: 20px; 
                    }
                
                    .content-block {
                        padding-bottom: 10px;
                        padding-top: 10px;
                    }
                
                    .footer {
                        clear: both;
                        margin-top: 10px;
                        text-align: center;
                        width: 100%; 
                    }
                        .footer td,
                        .footer p,
                        .footer span,
                        .footer a {
                        color: #999999;
                        font-size: 12px;
                        text-align: center; 
                    }
                
                    /* -------------------------------------
                        TYPOGRAPHY
                    ------------------------------------- */
                    h1,
                    h2,
                    h3,
                    h4 {
                        color: #000000;
                        font-family: sans-serif;
                        font-weight: 400;
                        line-height: 1.4;
                        margin: 0;
                        margin-bottom: 30px; 
                    }
                
                    h1 {
                        font-size: 35px;
                        font-weight: 300;
                        text-align: center;
                        text-transform: capitalize; 
                    }
                
                    p,
                    ul,
                    ol {
                        font-family: sans-serif;
                        font-size: 14px;
                        font-weight: normal;
                        margin: 0;
                        margin-bottom: 15px; 
                    }
                        p li,
                        ul li,
                        ol li {
                        list-style-position: inside;
                        margin-left: 5px; 
                    }
                
                    a {
                        color: #3498db;
                        text-decoration: underline; 
                    }
                
                    /* -------------------------------------
                        BUTTONS
                    ------------------------------------- */
                    .btn {
                        box-sizing: border-box;
                        width: 100%; }
                        .btn > tbody > tr > td {
                        padding-bottom: 15px; }
                        .btn table {
                        width: auto; 
                    }
                        .btn table td {
                        background-color: #ffffff;
                        border-radius: 5px;
                        text-align: center; 
                    }
                        .btn a {
                        background-color: #ffffff;
                        border: solid 1px #3498db;
                        border-radius: 5px;
                        box-sizing: border-box;
                        color: #3498db;
                        cursor: pointer;
                        display: inline-block;
                        font-size: 14px;
                        font-weight: bold;
                        margin: 0;
                        padding: 12px 25px;
                        text-decoration: none;
                        text-transform: capitalize; 
                    }
                
                    .btn-primary table td {
                        background-color: #3498db; 
                    }
                
                    .btn-primary a {
                        background-color: #3498db;
                        border-color: #3498db;
                        color: #ffffff; 
                    }
                
                    /* -------------------------------------
                        OTHER STYLES THAT MIGHT BE USEFUL
                    ------------------------------------- */
                    .last {
                        margin-bottom: 0; 
                    }
                
                    .first {
                        margin-top: 0; 
                    }
                
                    .align-center {
                        text-align: center; 
                    }
                
                    .align-right {
                        text-align: right; 
                    }
                
                    .align-left {
                        text-align: left; 
                    }
                
                    .clear {
                        clear: both; 
                    }
                
                    .mt0 {
                        margin-top: 0; 
                    }
                
                    .mb0 {
                        margin-bottom: 0; 
                    }
                
                    .preheader {
                        color: transparent;
                        display: none;
                        height: 0;
                        max-height: 0;
                        max-width: 0;
                        opacity: 0;
                        overflow: hidden;
                        mso-hide: all;
                        visibility: hidden;
                        width: 0; 
                    }
                
                    .powered-by a {
                        text-decoration: none; 
                    }
                
                    hr {
                        border: 0;
                        border-bottom: 1px solid #f6f6f6;
                        margin: 20px 0; 
                    }
                
                    /* -------------------------------------
                        RESPONSIVE AND MOBILE FRIENDLY STYLES
                    ------------------------------------- */
                    @media only screen and (max-width: 620px) {
                        table[class=body] h1 {
                        font-size: 28px !important;
                        margin-bottom: 10px !important; 
                        }
                        table[class=body] p,
                        table[class=body] ul,
                        table[class=body] ol,
                        table[class=body] td,
                        table[class=body] span,
                        table[class=body] a {
                        font-size: 16px !important; 
                        }
                        table[class=body] .wrapper,
                        table[class=body] .article {
                        padding: 10px !important; 
                        }
                        table[class=body] .content {
                        padding: 0 !important; 
                        }
                        table[class=body] .container {
                        padding: 0 !important;
                        width: 100% !important; 
                        }
                        table[class=body] .main {
                        border-left-width: 0 !important;
                        border-radius: 0 !important;
                        border-right-width: 0 !important; 
                        }
                        table[class=body] .btn table {
                        width: 100% !important; 
                        }
                        table[class=body] .btn a {
                        width: 100% !important; 
                        }
                        table[class=body] .img-responsive {
                        height: auto !important;
                        max-width: 100% !important;
                        width: auto !important; 
                        }
                    }
                
                    /* -------------------------------------
                        PRESERVE THESE STYLES IN THE HEAD
                    ------------------------------------- */
                    @media all {
                        .ExternalClass {
                        width: 100%; 
                        }
                        .ExternalClass,
                        .ExternalClass p,
                        .ExternalClass span,
                        .ExternalClass font,
                        .ExternalClass td,
                        .ExternalClass div {
                        line-height: 100%; 
                        }
                        .apple-link a {
                        color: inherit !important;
                        font-family: inherit !important;
                        font-size: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                        text-decoration: none !important; 
                        }
                        #MessageViewBody a {
                        color: inherit;
                        text-decoration: none;
                        font-size: inherit;
                        font-family: inherit;
                        font-weight: inherit;
                        line-height: inherit;
                        }
                        .btn-primary table td:hover {
                        background-color: #34495e !important; 
                        }
                        .btn-primary a:hover {
                        background-color: #34495e !important;
                        border-color: #34495e !important; 
                        } 
                    }
                
                    </style>
                </head>
                <body class="">
                    <span class="preheader">Welcome ${user.email}, we are glad to see you reading this email.</span>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                    <tr>
                        <td>&nbsp;</td>
                        <td class="container">
                        <div class="content">
                
                            <!-- START CENTERED WHITE CONTAINER -->
                            <table role="presentation" class="main">
                
                            <!-- START MAIN CONTENT AREA -->
                            <tr>
                                <td class="wrapper">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                    <td>
                                        <p>Hi there,</p>
                                        <p>One of the students of your faculty (${contributor.username} - ${contributor.email}) has just submitted a contribution (${title})</p>
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                        <tbody>
                                            <tr>
                                            <td align="left">
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                    <td> <a href="${contributionLink}" target="_blank">
                                                    Go To The Submission
                                                    </a> </td>
                                                    </tr>
                                                </tbody>
                                                </table>
                                            </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                        <p>When a contribution is submitted. You will need to give it a comment.</p>
                                        <p>Thank you! Hope you have a good time using our application.</p>
                                    </td>
                                    </tr>
                                </table>
                                </td>
                            </tr>
                
                            <!-- END MAIN CONTENT AREA -->
                            </table>
                            <!-- END CENTERED WHITE CONTAINER -->
                
                            <!-- START FOOTER -->
                            <div class="footer">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                <td class="content-block">
                                    <span class="apple-link">Company Inc, 3 Abbey Road, San Francisco CA 94102</span>
                                    <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a>.
                                </td>
                                </tr>
                                <tr>
                                <td class="content-block powered-by">
                                    Powered by <a href="http://htmlemail.io">HTMLemail</a>.
                                </td>
                                </tr>
                            </table>
                            </div>
                            <!-- END FOOTER -->
                
                        </div>
                        </td>
                        <td>&nbsp;</td>
                    </tr>
                    </table>
                </body>
                </html>
                `,
        };
        sendEmail(mailOptions);
      }
  })
}

module.exports = {
    getAllContributions,
    getContributionByID,
    getContributionByUserID,
    getContributionByFacultyID,
    addContribution,
    editContribution,
    deleteContribution,
    getNumberOfContributionsReport,
    getNumberOfContributorsReport,
    getContributionsWithoutCommentReport
}