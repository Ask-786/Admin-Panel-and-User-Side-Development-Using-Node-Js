var express = require('express');
var router = express.Router();

const adminName = "Ask@786"
const adminPass = "123456"

router.get('/', function(req, res, next) {
  if(req.session.adLoggedIN){
    res.redirect('/admin'); 
  }else{
    res.render('login_admin',{adLoginErr:req.session.adLoginErr,title:"Admin Login"})
    req.session.adLoginErr=false;
  }
});

router.post('/',function(req, res, next) {
  if(req.body.name === adminName && req.body.password === adminPass){
    req.session.adLoggedIN=true;
    res.redirect('/admin')
  }else{
    req.session.adLoginErr=true
    res.redirect('adlogin')
  }
});

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/adlogin');
})

module.exports = router;