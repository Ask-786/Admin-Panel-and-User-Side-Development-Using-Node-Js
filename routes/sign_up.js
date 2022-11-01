const { response } = require('express');
var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')

router.get('/', function(req, res, next) {
  if(req.session.loggedIN){
    res.redirect('/home')
  }else{
    res.render('sign_up',{userExists:req.session.userExists,title:"Sign Up"})
    req.session.userExists=false;
  }
}); 

router.post('/',(req,res)=>{
  // userHelpers.addUsers(req.body,(result)=>{
  //   res.redirect('/home')
  // })
 
  req.session.user=req.body.username
  userHelpers.addUsers(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIN=true;
      res.redirect('/home')
    }else{
      req.session.userExists=true;
      res.redirect('/signup')
    } 
  })
});

module.exports = router;