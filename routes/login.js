var express = require('express');
const { response } = require('../app');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')


/* GET home page. */
router.get(['/','/login'], function(req, res, next) {
  if(req.session.loggedIN){
    res.redirect('/home')
  }else{
    res.render('login')
  }
});

router.post('/login', function(req, res, next) {
  userHelpers.getLoginDetails(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIN=true;
      res.redirect('/home')
    }else{
      res.render('login',{message:true})
    }
  })
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
