var express = require('express');
var router = express.Router();
const blogHelpers = require('../helpers/blog-helpers')


router.get('/', function(req, res, next) {
  if(req.session.loggedIN){
    blogHelpers.getAllBlogs().then((allBlogs)=>{
      res.render('home',{allBlogs})
    })
  }else{
    res.redirect('/')
  }
});


module.exports = router;