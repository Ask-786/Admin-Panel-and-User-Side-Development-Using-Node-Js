var express = require("express");
var router = express.Router();
const blogHelpers = require("../helpers/blog-helpers");

const userNotExistsAuth = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/");
    req.session.destroy();
  } else {
    next();
  }
};

router.get("/", userNotExistsAuth, function (req, res, next) {
  if (req.session.loggedIN) {
    let username = req.session.user;
    blogHelpers.getAllBlogs().then((allBlogs) => {
      res.render("home", { allBlogs, username, title: "Home" });
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
