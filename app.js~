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
const {Admin} = require("./models/adminpost");
const query_controller = require("./controller/query-controller");
const admin_controller = require("./controller/admin-controller");
const library = require("./lib/lib");
mongoose.connect("mongodb://localhost:27017/hackocracy");
var db = mongoose.connection;
var app = express();
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.text());

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

app.use(express.static(path.join(__dirname, 'public')));
// View Engine
app.set('views', path.join(__dirname, 'views')); // Views folder will handle views
app.set('view engine', 'ejs'); // set view engine to handlebars

// BodyParser Middleware
app.use(bodyParser());

var port = process.env.PORT || 3000;
// Initializing routers
var isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
     next();
  }
  else{
    res.redirect('/');
  }
}

app.get("/",(req,res)=>{
  if(req.isAuthenticated())
    res.redirect('/dashboard')
  else{
    res.render("homepage");
  }
});


app.get("/feeds",isLoggedIn,(req,res)=>{
  res.render("404");
});

//Requires authenticate specially for admins
app.get("/adminportal",isLoggedIn,(req,res)=>{
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
    successRedirect :  '/dashboard',
    failureRedirect : '/login',
    failureFlash : true
})
);
app.post('/register',passport.authenticate('local-signup',{
    successRedirect :  '/feeds',
    failureRedirect :  '/register',
}))
app.get('/register',function(req,res){
    if(req.isAuthenticated())
      res.redirect('/dashboard');
    else 
      res.render("login");
})
app.get('/login',(req,res)=>{
  res.render("login");
})
app.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/login')
})

// Query related things and use of APIs
app.get("/queryposting",(req,res)=>{
  library.getTag((result)=>{
    console.log(result.data[0]);
    res.render("queryposting",{"data":result.data});
    console.log(req.body.tags);
  })
//  var body = _.pick(req.body,[]);// Do be done according to the body page 
});

app.post("/queryposting",(req,res)=>{
  query_controller.insertQuery(req);
});

// All feeds are included from here
app.get("/getQuery/all",(req,res)=>{
  query_controller.getAllElements(req,(query)=>{
    if(query.data.length==0)
    res.render("404");
    else
    res.render("queryall",{"data":query.data});
  });
});

// Getting the query by a particular tag
app.get('/getQuery/:tags',(req,res)=>{
  query_controller.getElementByTags(req,(found)=>{
    if(found.data.length==0)
    res.render("404");
    else
    res.render("querybytags",{"data":found.data});
  });
});
// Getting the query by a particular headings
app.get('/getQuery/heading/:heading',(req,res)=>{
  query_controller.getElementByHeading(req,(found)=>{
    res.render("querybyheading",{"data":found.data});
  });
});
// Getting the query by a particular date posted:

app.get('/getQuery/all/:date',(req,res)=>{
  query_controller.getElementbyDate(req,(found)=>{
    console.log(found.data);
    if(found.data.length==0)
    res.render("404");
    else
    res.render("querybydate",{"data":found.data});
  });
});

// Getting the query according to the a particular id
app.get('/getQuery/:id',(req,res)=>{
  query_controller.getElementByUserId(req,(found)=>{
    if(found.data.length==0){
      res.render("404");
    }
    else
    res.render("querybyid",{"data":found.data});
  })
})

// Sort the date by date createdAt
app.get('/sortqbydate1',(req,res)=>{
  query_controller.sortByCreatedDate(req,(result)=>{
    res.render("sortbycreatedDate",{"data":result.data});
  });
});
// Sort the date by date updatedAt
app.get('/sortqbydate2',(req,res)=>{
  query_controller.sortByUpdatedDate(req,(result)=>{
    res.render("sortbyupdatedDate",{"data":result.data});
  });
});
// Calling the admin related queries
app.get("/adminposting",(req,res)=>{
  library.getTag((result)=>{
    console.log(result.data[0]);
    res.render("adminposting",{"data":result.data,"data1":result.data1});
  })
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
    if(result.data.length==0)
    res.render("404");
    else
    res.render("adminqueryid",{"data":result.data});
  });
});
// All query according to the particular tags
app.get("/getAdmin/:tags",(req,res)=>{
  admin_controller.getElementByTags(req,(result)=>{
    if(result.data.length==0)
    res.render("404");
    else
    res.render("adminquerytags",{"data":result.data});
  });
});
// All query according to the heading 
app.get("/getAdmin/:heading",(req,res)=>{
  admin_controller.getElementByHeading(req,(result)=>{
    if(result.data.length==0){
      res.render("404");
    }
    else
    res.render("adminqueryheading",{"data":result.data});
  });
});

// All query according to the date
app.get('/getAdmin/:date',(req,res)=>{
  admin_controller.getElementbyDate(req,(result)=>{
    if(result.data.length==0)
    res.render("404");
    else
    res.render("adminquerydate",{"data":result.data});
  });
});
// All query access to the ministry
app.get('/getAdmin/:ministry',(req,res)=>{
  admin_controller.getElementByMinistry(req,(result)=>{
    if(result.data.length==0)
    {
      res.render("404");
    }
    else
    res.render("adminqueryministry",{"data":result.data});
  });
});

// Starting the server on a particular port
app.listen(port ,()=> {
	console.log('Server started on port '+ port);
});
