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
const {Vote} = require("./models/vote");
const {Comment}= require("./models/comment");
const {CommentAdmin} = require("./models/commentadmin");// Admin Comment controller
const comments  = require("./controller/comments");// Comment controller
const query_controller = require("./controller/query-controller");
const admin_controller = require("./controller/admin-controller");
const comment_ctrl_admin = require("./controller/commentadmin");
const library = require("./lib/lib");
const vote = require("./controller/vote");
mongoose.connect("mongodb://localhost:27017/hackocracy");
var db = mongoose.connection;
var app = express();
var async = require('async')
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
		admin_controller.sortByCreatedDate(req,(result)=>{
			res.render("homepage",{"data":result.data});
		});
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
app.get("/dashboard",(req,res)=>{
		var pageInfo = {}

		pageInfo.flash = req.flash("message")
		console.log(pageInfo)
	library.getMinistry((result)=>{
		pageInfo.data = result.data;
		res.render("dashboard",pageInfo);  
	});
	
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
	query_controller.insertQuery(req,(found)=>{
		if(found.data){
		req.flash("message","You have inserted your query")
	res.redirect('/dashboard')
 }
 
	});

	 req.flash("message","You have inserted your query")
	res.redirect('/dashboard')
 
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
app.get('/getAdmin',(req,res)=>{
    pageInfo={};
    var items = [admin_controller];
    async.each(items,function(item,callback){
	item.getAllElements(req,(result)=>{
	    pageInfo.data=result.data;
	    callback();	
	})
    },function(){
        var items2 = [library];
        async.each(items2,function(item,callback){
        item.getTag((result)=>{
        pageInfo.tags=result.data;
        callback()	
        })
    },function(){
        async.each(items,function(item,callback){
         item.sortByCreatedDate(req,(result)=>{
             pageInfo.sortdate=result.data;
             console.log("sorting by data",result.data)
             callback()
         })       
        },function(){
    
        res.render("admin",pageInfo);
       })    
    })
   })
  });
	
// All query for any particular user
app.get('/getAdmin/:id',(req,res)=>{
	admin_controller.getElementByUserId(req,(result)=>{
		res.render("adminqueryid",{"data":result.data});
	});
});

// All message accoriding to the particular message id 
app.get('/getAdmin/mid/:mid',(req,res)=>{
	var items = [admin_controller]
	var pageInfo = {}
	var cnt = 0;
	async.each(items,function(item,callback){
		item.getElementById(req,(result)=>{
			if(result.data.length == 0)
				res.render("404")
			else{
				pageInfo.data = result.data;
				callback()
			}
		})
	},function(){
		var items1 = [vote];
		async.each(items1,function(item,callback){
			item.calculateVotes(req,function(found){
				pageInfo.upVotes = found.upVote;
				pageInfo.downVotes = found.downVote;
				callback()
			})
		},function(){
			var items2 = [comment_ctrl_admin];
			async.each(items2,function(item,callback){
				item.countComments(req,(found)=>{
					pageInfo.commentcount = found.data;
					callback()
				});
			},function(){
				var items3 = [comment_ctrl_admin];
				async.each(items3,function(item,callback){
					item.getAllCommentByAdmin(req,(found)=>{
						console.log("--------------")
						console.log(found)
						pageInfo.comment = found.data;
						callback()
					})
				},function(){
				
			res.render("adminqueryheading",pageInfo);

		})
	})
})
})
});

app.post("/commentposting",(req,res)=>{
	comment_ctrl_admin.insertComment(req,(found)=>{
		console.log(found.data);
	});
})
app.get("/enterVote",function(req,res){
	vote.insertVote(req,function(data){
		console.log(data)
	})
})
/*app.get('/getAdmin/mid/:mid',(req,res)=>{
	admin_controller.getElementById(req,(result)=>{
		if(result.data.length==0)
		res.render("404");
		else
		res.render("adminqueryheading",{"data":result.data});
	});
});*/
// All query according to the particular tags
app.get("/getAdmin/tags/:tags",(req,res)=>{
	 pageInfo={};
    var items = [admin_controller];
    async.each(items,function(item,callback){
            item.getElementByTags(req,(result)=>{
            pageInfo.data=result.data;
            callback();	
            })
    },function(){
        var items2 = [library];
        async.each(items2,function(item,callback){
        item.getTag((result)=>{
        pageInfo.tags=result.data;
        callback()	
        })
    },function(){
        async.each(items,function(item,callback){
            item.sortByCreatedDate(req,(result)=>{
                pageInfo.sortdate=result.data;
                console.log("sorting by data",result.data)
                callback()
            })       
        },function(){
            res.render("adminquerytags",pageInfo);
    })    
})
})
});
// All query according to the heading 
app.get("/getAdmin/heading/:heading",(req,res)=>{
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
app.get('/getAdmin/ministry/:ministry',(req,res)=>{
	 pageInfo={};
    var items = [admin_controller];
    async.each(items,function(item,callback){
        item.getElementByMinistry(req,(result)=>{
        pageInfo.data=result.data;
        callback();	
        })
    },function(){
        var items2 = [library];
        async.each(items2,function(item,callback){
        item.getTag((result)=>{
        pageInfo.tags=result.data;
        callback()	
        })
    },function(){
        async.each(items,function(item,callback){
            item.sortByCreatedDate(req,(result)=>{
                pageInfo.sortdate=result.data;
                console.log("sorting by data",result.data)
                callback()
            })       
        },function(){
            res.render("adminquerytags",pageInfo);
        })    
    })
    })
    });

app.get('/sortqbydate3',(req,res)=>{
 admin_controller.sortByCreatedDate(req,(result)=>{
		res.render("sortbyCreatedDate1",{"data":result.data});
	});
});
// Sort the date by date updatedAt
app.get('/sortqbydate4',(req,res)=>{
	admin_controller.sortByUpdatedDate(req,(result)=>{
		res.render("soryByModifiedDate1",{"data":result.data});
	});
});
app.get('/demo',function(req,res){
 // var abc;
 /* admin_controller.getAllElements(req,(found)=>{
		
	})*/
	//var pageInfo = {}
 /* async.each([admin_controller,query_controller],function(item,callback){

		if(item == "admin_controller"){
			item.getAllElements(req,(found)=>{
				pageInfo.admin = found.data;
			})
		}
		else if(){
			item.getAllElements(req,(found)=>{
				pageInfo.query = found.data;
			})
		}
		callback()

	},function(){
		res.render("gkhblj",pageInfo)
	})*/
	/*async.each([a,b,c],function(item){
		query_controller.item(req,(found)=>{
			
		})
	})*/
})


// Starting the server on a particular port
app.listen(port ,()=> {
		console.log('Server started on port '+ port);
});
