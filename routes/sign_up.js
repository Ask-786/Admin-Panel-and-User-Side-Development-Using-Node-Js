var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')

router.get('/', function(req, res, next) {
  if(req.session.loggedIN){
    res.redirect('/home')
  }else{
    res.render('sign_up')
  }
}); 

router.post('/',(req,res)=>{
  // userHelpers.addUsers(req.body,(result)=>{
  //   res.redirect('/home')
  // })
  userHelpers.addUsers(req.body).then((id)=>{
    req.session.loggedIN=true;
    res.redirect('/home')
  })
});

module.exports = router;