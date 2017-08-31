// import packages
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require('ejs');
var _ = require("lodash");
const flash = require('connect-flash');

const {User} = require("./models/user")// Now can access all the user.js Schema via that of User variable
mongoose.connect("mongodb://localhost:27017/Todo");
var db = mongoose.connection;
var app = express();

const session = require('express-session')
app.use(session({
  cookieName  : 'session',
  secret      : 'asdfghjklpoiuytrewq',
}))
app.use(flash());
const passport = require('passport');

app.use(passport.initialize());

app.use(passport.session());

require('./config/passport')(passport);


// View Engine
app.set('views', path.join(__dirname, 'views')); // Views folder will handle views
app.set('view engine', 'ejs'); // set view engine to handlebars

// BodyParser Middleware
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
// Initializing routers
app.get("/",(req,res)=>{
  res.render("homepage");
});

// For the getting part
/*app.get("/login",(req,res)=>{
  res.render("login");
});

// For the controller part
app.post("/login",(req,res)=>{
  res.render("login");
});

// For the registter part
app.get("/register" , (req,res)=>{
  res.render("register");
});

// For the controller part
app.post("/register",(req,res)=>{
  res.render("register");
  //var body= _.pick(req.body,['email','password']);
  //Will be done according the register form given
  var newUser = User(body);
  newUser.save().then((user)=>{
    res.status(200).send();
  },(err)=>{
    res.status(400).send();
  })
});*/

app.get("/feeds",(req,res)=>{
  res.render("feeds");
});

//Requires authenticate specially for admins
app.get("/adminportal",(req,res)=>{
  res.render("adminportal")
});

app.get("/publicportal",(req,res)=>{
  res.render("publicportal");
});
// Submission of questions or the query
app.post("/queryposting",(req,res)=>{
  res.render("queryposting");
  var body = _.pick(req.body,[]);// Do be done according to the body page 
  
  
});

app.post("/adminposting",(req,res)=>{
  res.render("adminposting");
  var body = _.pick(req.body,[])// To be done according to the adminposting page;
});
// Query initilization according to that of catogory
app.get("/feeds/:id",(req,res)=>{
  
});
 
//Main page that comes after that of the logining the user in
app.get("/dashboard/:id",(req,res)=>{
  res.render("dashboard");
});
app.post('/login',passport.authenticate('local-login',{
    successRedirect :  '/home',
    failureRedirect : '/afhjguth',
    failureFlash : true
}))
app.post('/register',passport.authenticate('local-signup',{
    successRedirect :  '/dashfboghard',
    failureRedirect :  '/auth',
}))
app.get('/register',function(req,res){
    if(req.isAuthenticated())
      res.redirect('/home');
    else 
      res.render("register");
})
app.get('/login',(req,res)=>{
  res.render("login");
})
app.listen(port ,()=> {
	console.log('Server started on port '+ port);
});
