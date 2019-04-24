const restricted = require("./restricted-middleware");
const Tickets = require("../tickets/tickets-model");

module.exports = {
  student,
  helper
};

function student(req, res, next) {
  const role = req.headers.role;

  if (role === "student") {
    next();
  } else {
    res.status(401).json({
      message: "only students can post"
    });
  }
}

function helper(req, res, next) {
  const role = req.headers.role;

  if (role === "helper") {
    next();
  } else {
    res.status(401).json({
      message: "only helpers allowed here"
    });
  }
}
