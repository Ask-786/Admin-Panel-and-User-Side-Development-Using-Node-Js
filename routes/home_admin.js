const express = require('express');
const router = express.Router();
const blogHelpers = require('../helpers/blog-helpers')
const userHelpers = require('../helpers/user-helpers')


router.get('/', function(req, res, next) {
  if(req.session.adLoggedIN){
    blogHelpers.getAllBlogs().then((allBlogs)=>{
      res.render('home_admin',{allBlogs})
    })
  }else{
    res.redirect('/adlogin')
  }
});

router.get('/add-blogs',(req,res)=>{
  if(req.session.adLoggedIN){
    res.render('add_blogs');
  }else{
    res.redirect('/adlogin')
  }
});

router.post('/add-blog',(req,res)=>{
  blogHelpers.addBlogs(req.body,(result)=>{
    res.redirect('/admin/add-blogs')
  })
});

router.get('/users',(req,res)=>{
  if(req.session.adLoggedIN){
    userHelpers.getAllUsers().then((allUsers)=>{
      res.render('users',{allUsers})
    })
  }else{
    res.redirect('/adlogin')
  }
})

module.exports = router;