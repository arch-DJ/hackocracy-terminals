// import packages
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require('ejs');
var _ = require("lodash");
const flash = require('connect-flash');

const {User} = require("./models/user");// Now can access all the user.js Schema via that of User variable
const {Query} = require("./models/query"); // Now can access all the function of the query.js schema
const query_controller = require("./controller/query-controller");
const admin_controller = require("./controller/admin-controller");
mongoose.connect("mongodb://localhost:27017/hackocracy");
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
app.use(bodyParser());

var port = process.env.PORT || 3000;
// Initializing routers
app.get("/",(req,res)=>{
  res.render("homepage");
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


// Query initilization according to that of catogory
app.get("/feeds/:id",(req,res)=>{
  
});



//Main page that comes after that of the logining the user in
app.get("/dashboard/:id",(req,res)=>{
  res.render("dashboard");
});

// Main page where all the date precides
app.post('/login',passport.authenticate('local-login',{
    successRedirect :  '/home',
    failureRedirect : '/afhjguth',
    failureFlash : true
})
);
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

// Query related things and use of APIs
app.get("/queryposting",(req,res)=>{
  res.render("queryposting");
//  var body = _.pick(req.body,[]);// Do be done according to the body page 
});

app.post("/queryposting",(req,res)=>{
  query_controller.insertQuery(req);
});

// All feeds are included from here
app.get("/query/all",(req,res)=>{
  query_controller.getAllElements(req,(query)=>{
    res.render("queryall",{"data":query.data});
  });
});

// Getting the query by a particular tag
app.get('/getQuery/:tags',(req,res)=>{
  querycontroller.getElementByTags(req,(found)=>{
    res.render("querybytags",{"data":found.data});
  });
});
// Getting the query by a particular headings
app.get('/getQuery/:heading',(req,res)=>{
  query_controller.getElementByHeading(req,(found)=>{
    res.render("querybyheading",{"data":found.data});
  });
});
// Getting the query by a particular date posted:

app.get('/getQuery/:date',(req,res)=>{
  query_controller.getElementbyDate(req,(found)=>{
    res.render("querybydate",{"data":found.data});
  });
});

// Getting the query according to the a particular id
app.get('/getQuery/:id',(req,res)=>{
  query_controller.getElementByUserId(req,(found)=>{
    res.render("querybyid",{"data":found.data});
  })
})

// Calling the admin related queries
app.get("/adminposting",(req,res)=>{
  res.render("adminposting");
});
app.post('/adminposting',(req,res)=>{
  admin_controller.saveMessage(req);
});
// All admin queries
app.get('/getAdmin/all',(req,res)=>{
  admin_controller.getAllElements(req,(result)=>{
    res.render("admin",{"data":result.data});
  })
});
// All query for any particular user
app.get('/getAdmin/:id',(req,res)=>{
  admin_controller.getElementByUserId(req,(result)=>{
    res.render("adminqueryid",{"data":result.data});
  });
});
// All query according to the particular tags
app.get("/getAdmin/:tags",(req,res)=>{
  admin_controller.getElementByTags(req,(result)=>{
    res.render("adminquerytags",{"data":result.data});
  });
});
// All query according to the heading 
app.get("/getAdmin/:heading",(req,res)=>{
  admin_controller.getElementByHeading(req,(result)=>{
    res.render("adminqueryheading",{"data":result.data});
  });
});

// All query according to the date
app.get('/getAdmin/:date',(req,res)=>{
  admin_controller.getElementbyDate(req,(result)=>{
    res.render("adminquerydate",{"data":result.data});
  });
});
// All query access to the ministry
app.get('/getAdmin/:ministry',(req,res)=>{
  admin_controller.getElementByMinistry(req,(result)=>{
    res.render("adminqueryministry",{"data":result.data});
  });
});

// Starting the server on a particular port
app.listen(port ,()=> {
	console.log('Server started on port '+ port);
});
