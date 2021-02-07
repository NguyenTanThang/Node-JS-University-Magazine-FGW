var express = require('express');
var router = express.Router();

const userRoute = {
  GET_ALL_USERS: {
    route: "/users",
    requestType: "GET"
  },
  GET_BY_USER_ID: {
    route: "/users/${userID}",
    requestType: "GET"
  },
  ADD_USER: {
    route: "/users/add",
    body: [
      "email", "username", "password", "role"
    ],
    requestType: "POST",
  },
  LOGIN: {
    route: "/users/login",
    body: [
      "email", "password"
    ],
    requestType: "POST",
  },
  EDIT_USER: {
    route: "/users/edit/${userID}",
    body: [
      "any"
    ],
    requestType: "PUT"
  },
  DELETE_USER: {
    route: "/users/delete/${userID}",
    requestType: "DELETE"
  }
}

const userRoleRoute = {
  GET_ALL_USER_ROLES: {
    route: "/user-roles",
    requestType: "GET"
  },
}

const commentRoute = {
  GET_ALL_COMMENTS: {
    route: "/comments",
    requestType: "GET"
  },
  GET_BY_COMMENT_ID: {
    route: "/comments/commentID/${commentID}",
    requestType: "GET"
  },
  GET_BY_USER_ID: {
    route: "/comments/userID/${userID}",
    requestType: "GET"
  },
  GET_BY_CONTRIBUTION_ID: {
    route: "/comments/contributionID/${contributionID}",
    requestType: "GET"
  },
  ADD_COMMENT: {
    route: "/comments/add",
    body: [
      "contribution", "content", "user"
    ],
    requestType: "POST"
  }
}

const termRoute = {
  GET_ALL_TERMS: {
    route: "/terms",
    requestType: "GET"
  },
  GET_BY_TERM_ID: {
    route: "/terms/${termID}",
    requestType: "GET"
  },
  ADD_TERM: {
    route: "/terms/add",
    body: [
      "name", "closureDate", "finalClosureDate"
    ],
    requestType: "POST",
  },
  EDIT_TERM: {
    route: "/terms/edit/${termID}",
    body: [
      "any"
    ],
    requestType: "PUT"
  },
  DELETE_TERM: {
    route: "/terms/delete/${termID}",
    requestType: "DELETE"
  }
}

const messageRoute = {
  GET_ALL_MESSAGES: {
    route: "/messages",
    requestType: "GET"
  },
  GET_BY_MESSAGE_ID: {
    route: "/messages/messageID/${messageID}",
    requestType: "GET"
  },
  GET_BY_ROOM_ID: {
    route: "/messages/roomID/${roomID}",
    requestType: "GET"
  },
  GET_BY_USER_ID: {
    route: "/messages/userID/${userID}",
    requestType: "GET"
  },
  ADD_MESSAGE: {
    route: "/messages/add",
    body: [
      "author", "content", "room"
    ],
    requestType: "POST",
  },
}

const messageRoomRoute = {
  GET_ALL_MESSAGE_ROOMS: {
    route: "/message-rooms",
    requestType: "GET"
  },
  GET_BY_MESSAGE_ROOM_ID: {
    route: "/message-rooms/messageRoomID/${messageRoomID}",
    requestType: "GET"
  },
  GET_BY_USER_ID: {
    route: "/message-rooms/userID/${userID}",
    requestType: "GET"
  },
  ADD_MESSAGE: {
    route: "/message-rooms/add",
    body: [
      "sender", "receiver"
    ],
    requestType: "POST",
  },
}

const facultyAssignmentRoute = {
  GET_ALL_FACULTY_ASSIGNMENTS: {
    route: "/faculty-assignments",
    requestType: "GET"
  },
  GET_BY_FACULTY_ASSIGNMENT_ID: {
    route: "/faculty-assignments/facultyAssigmentID/${facultyAssigmentID}",
    requestType: "GET"
  },
  GET_BY_USER_ID: {
    route: "/faculty-assignments/userID/${userID}",
    requestType: "GET"
  },
  GET_BY_FACULTY_ID: {
    route: "/faculty-assignments/facultyID/${facultyID}",
    requestType: "GET"
  },
  ADD_FACULTY_ASSIGNMENT: {
    route: "/faculty-assignments/add",
    body: [
      "user", "faculty"
    ],
    requestType: "POST",
  },
  EDIT_FACULTY_ASSIGNMENT: {
    route: "/faculty-assignments/edit/${facultyAssigmentID}",
    body: [
      "any"
    ],
    requestType: "PUT"
  },
  DELETE_FACULTY_ASSIGNMENT: {
    route: "/faculty-assignments/delete/${facultyAssigmentID}",
    requestType: "DELETE"
  }
}

const facultyRoute = {
  GET_ALL_FACULTIES: {
    route: "/faculties",
    requestType: "GET"
  },
  GET_BY_FACULTY_ID: {
    route: "/faculties/${facultyID}",
    requestType: "GET"
  },
  ADD_FACULTY: {
    route: "/faculties/add",
    body: [
      "name"
    ],
    requestType: "POST",
  },
  EDIT_FACULTY: {
    route: "/faculties/edit/${facultyID}",
    body: [
      "any"
    ],
    requestType: "PUT"
  },
  DELETE_FACULTY: {
    route: "/faculties/delete/${facultyID}",
    requestType: "DELETE"
  }
}

const contributionRoute = {
  GET_ALL_CONTRIBUTIONS: {
    route: "/contributions",
    requestType: "GET"
  },
  GET_BY_FACULTY_CONTRIBUTION_ID: {
    route: "/contributions/contributionID/${contributionID}",
    requestType: "GET"
  },
  GET_BY_USER_ID: {
    route: "/contributions/userID/${userID}",
    requestType: "GET"
  },
  GET_BY_FACULTY_ID: {
    route: "/contributions/facultyID/${facultyID}",
    requestType: "GET"
  },
  ADD_CONTRIBUTION: {
    route: "/contributions/add",
    body: [
      "title", "docFileURL", "imageFileURL", "contributor", "faculty", "term"
    ],
    requestType: "POST",
  },
  EDIT_CONTRIBUTION: {
    route: "/contributions/edit/${contributionID}",
    body: [
      "any"
    ],
    requestType: "PUT"
  },
  DELETE_CONTRIBUTION: {
    route: "/contributions/delete/${contributionID}",
    requestType: "DELETE"
  }
}

router.get('/', function (req, res, next) {
  res.json({
    comments: commentRoute,
    contributions: contributionRoute,
    users: userRoute,
    "user-roles": userRoleRoute,
    terms: termRoute,
    messages: messageRoute,
    "message-rooms": messageRoomRoute,
    "faculty-assigments": facultyAssignmentRoute,
    faculties: facultyRoute
  })
});

module.exports = router;