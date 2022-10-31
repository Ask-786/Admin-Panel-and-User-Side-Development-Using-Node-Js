const express = require('express');
const { rawListeners } = require('../app');
const router = express.Router();
const blogHelpers = require('../helpers/blog-helpers')
const userHelpers = require('../helpers/user-helpers')

const auth =(req,res,next)=>{
  if(req.session.adLoggedIN){
    next()
  }else{
    res.redirect('/adlogin')
  }
}

router.get('/',auth, function(req, res, next) {
  
    blogHelpers.getAllBlogs().then((allBlogs)=>{
      res.render('home_admin',{allBlogs})
    })
  
});

router.get('/add-blogs',auth,(req,res)=>{
  
    res.render('add_blogs');
  
});

router.post('/add-blog',(req,res)=>{
  blogHelpers.addBlogs(req.body,(result)=>{
    res.redirect('/admin/add-blogs')
  })
});

router.get('/users',auth,(req,res)=>{
    userHelpers.getAllUsers().then((allUsers)=>{
      res.render('users',{allUsers})
    })
})

router.get('/delete-blog/:id',(req,res)=>{
  let blogId = req.params.id;
  blogHelpers.deleteBlog(blogId).then((returnVal)=>{
    console.log(blogId);
    res.redirect('/admin')
  })
})
router.get('/edit-blog',(req,res)=>{
  
})

module.exports = router;