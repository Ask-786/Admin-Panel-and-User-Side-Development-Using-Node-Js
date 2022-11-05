const express = require("express");
const { rawListeners } = require("../app");
const router = express.Router();
const blogHelpers = require("../helpers/blog-helpers");
const userHelpers = require("../helpers/user-helpers");

const auth = (req, res, next) => {
  if (req.session.adLoggedIN) {
    next();
  } else {
    res.redirect("/adlogin");
  }
};

router.get("/", auth, function (req, res, next) {
  blogHelpers.getAllBlogs().then((allBlogs) => {
    res.render("home_admin", { allBlogs, title: "admin" });
  });
});

router.get("/add-blogs", auth, (req, res) => {
  res.render("add_blogs", { title: "Add-Blogs" });
});

router.post("/add-blog", (req, res) => {
  blogHelpers.addBlogs(req.body, (result) => {
    res.redirect("/admin/add-blogs");
  });
});

router.get("/users", auth, (req, res) => {
  userHelpers.getAllUsers().then((allUsers) => {
    res.render("users", { allUsers, title: "User List" });
  });
});

router.get("/delete-blog/:id", auth, (req, res) => {
  let blogId = req.params.id;
  blogHelpers.deleteBlog(blogId).then((returnVal) => {
    res.redirect("/admin");
  });
});

router.get("/edit-blog/:id", auth, (req, res) => {
  let blogId = req.params.id;
  blogHelpers.getOneBlog(blogId).then((blog) => {
    res.render("edit_blogs", { blog, title: "Edit Blog" });
  });
});

router.post("/edit-blog/:id", (req, res) => {
  blogHelpers.editBlog(req.body, req.params.id).then(() => {
    res.redirect("/admin");
  });
});

router.get("/users/edit-user/:id", auth, (req, res) => {
  let userId = req.params.id;
  userHelpers.getOneUser(userId).then((user) => {
    res.render("edit_user", { user });
  });
});

router.post("/users/edit-user/:id", (req, res) => {
  userHelpers.editUser(req.params.id).then((returnVal) => {
    res.redirect("/admin/users");
  });
});

router.get("/users/delete-user/:id", auth, (req, res) => {
  let userId = req.params.id;
  req.session.userId = true;
  userHelpers.deleteUser(userId).then((returnVal) => {
    res.redirect("/admin/users");
  });
});

router.get("/users/user-search", auth, (req, res) => {});

router.post("/users/user-search", auth, (req, res) => {
  userHelpers.getQueriedUsers(req.body.searchdata).then((matchedUsers) => {
    res.render("users", {
      matchedUsers,
      title: "Users",
      searchVal: req.body.searchdata,
    });
  });
});

module.exports = router;
