const express = require('express');
const router = express.Router();
const blogHelpers = require('../helpers/blog-helpers')
const userHelpers = require('../helpers/user-helpers')


router.get('/', function(req, res, next) {
  blogHelpers.getAllBlogs().then((allBlogs)=>{
    res.render('home_admin',{allBlogs})
  })
});

router.get('/add-blogs',(req,res)=>{
  res.render('add_blogs');
});

router.post('/add-blog',(req,res)=>{
  blogHelpers.addBlogs(req.body,(result)=>{
    res.redirect('/admin/add-blogs')
  })
});

router.get('/users',(req,res)=>{
  userHelpers.getAllUsers().then((allUsers)=>{
    res.render('users',{allUsers})
  })
})

module.exports = router;