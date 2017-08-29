// import packages
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require('ejs');
var _ = require("lodash");


const {User} = require("./models/user")// Now can access all the user.js Schema via that of User variable
mongoose.connect('mongodb://localhost/hackocracyterminals');
var db = mongoose.connection;

var app = express();

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
app.get("/login",(req,res)=>{
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
});

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
app.get("/feeds/:id",(req,res))=>{
  
});
 
//Main page that comes after that of the logining the user in
app.get("/dashboard/:id",(req,res)=>{
  res.render("dashboard");
});
app.listen(port ,()=> {
	console.log('Server started on port '+ app.get('port'));
});
