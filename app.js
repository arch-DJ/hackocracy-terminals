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
const comment_ctrl_query  = require("./controller/comments");// Comment controller
const query_controller = require("./controller/query-controller");
const admin_controller = require("./controller/admin-controller");
const comment_ctrl_admin = require("./controller/commentadmin");
const library = require("./lib/lib");
const vote = require("./controller/vote");
require("./models/reply")
const reply = require("./controller/reply")
mongoose.connect(process.env.MONGOLAB_URI||"mongodb://localhost:27017/hackocracy");
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
		res.redirect('/no');
	}
}

app.get("/",(req,res)=>{
    pageInfo={};
    var items = [admin_controller];
    async.each(items,function(item,callback){
item.sortByCreatedDate(req,(result)=>{
pageInfo.data=result.data;
callback();	
})
    },function(){
        var items2 = [library];
        async.each(items2,function(item,callback){
        item.getTag((result)=>{
        pageInfo.tags=result.data;
        pageInfo.ministry=result.data1;
        pageInfo.website=result.data2;
        callback()	
        })
    },function(){
            res.render("homepage",pageInfo);
        
})
})
});

app.get("/no",(req,res)=>{
   res.render("nologin"); 
});
//Requires authenticate specially for admins
app.get("/adminportal",isLoggedIn,(req,res)=>{
	res.render("adminportal")
});
//Main page that comes after that of the logining the user in
app.get("/dashboard",isLoggedIn,(req,res)=>{
		var pageInfo = {}

		pageInfo.flash = req.flash("message")
		pageInfo.user = req.user;
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
		successRedirect :  '/dashboard',
		failureRedirect :  '/register',
}))
app.get('/register',function(req,res){
		if(req.isAuthenticated())
			res.redirect('/dashboard');
		else 
			{
			    var pageInfo = {}
		        pageInfo.flash = "Try again with different credentials,Your email address have been taken or You have entered some absurd value/unexpected value"
		        		        console.log("error",pageInfo.flash);
			    res.render("login",pageInfo);
			}
})
app.get('/login',(req,res)=>{
    pageInfo = {}
    pageInfo.flash = req.flash("errorMessages");
	res.render("login",pageInfo);
})
app.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/login')
})

// Query related things and use of APIs
app.get("/queryposting",isLoggedIn,(req,res)=>{
	library.getTag((result)=>{
		console.log(result.data[0]);
		res.render("queryposting",{"data":result.data});
		console.log(req.body.tags);
	})
//  var body = _.pick(req.body,[]);// Do be done according to the body page 
});

app.post("/queryposting",(req,res)=>{
	query_controller.insertQuery(req,(found)=>{
		if(found.res){
		req.flash("message","You have inserted your query")
	res.redirect('/dashboard')
 }
 else{
      req.flash("message","Your  query has not been inserted try again")
	res.redirect('/dashboard')
 }
 
	});

	
 
});

app.post("/replyposting",function(req,res){
	reply.insert(req,(result)=>{
	    if(result.res){
	        req.flash("message","Your have replied to the User!! Congrats");
	        res.redirect('/dashboard');
	    }
	    else{
	        req.flash("message","Some error occured while inserting the reply Please try again");
	        res.redirect('/dashboard');
	    }
	});
})

// All feeds are included from here
app.get("/getQuery",(req,res)=>{
	pageInfo={};
    var items = [query_controller];
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
            res.render("queryall",pageInfo);
    })    
})
})
});

// Getting the query by a particular tag
app.get('/getQuery/tags/:tags',(req,res)=>{
	pageInfo={};
    var items = [query_controller];
    async.each(items,function(item,callback){
        item.getElementByTags(req,(result)=>{
        if(result.data.length==0)
        {
            res.render("404");
        }
        else{
        pageInfo.data=result.data;
        callback();}	
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
            res.render("querybytags",pageInfo);
        })    
    })
    })
    });
// Getting the query by a particular headings
app.get('/getQuery/mid/:qid',isLoggedIn,(req,res)=>{
	var items = [query_controller]
	var pageInfo = {}
	pageInfo.isAdmin = req.user.group == 1;
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
		var items2 = [comment_ctrl_query];
		async.each(items2,function(item,callback){
		item.countComments(req,(found)=>{
		pageInfo.commentcount = found.data;
		callback()
		});
	},function(){
		var items3 = [comment_ctrl_query];
		async.each(items3,function(item,callback){
		item.getAllCommentByQuery(req,(found)=>{
		console.log("--------------")
		console.log(found)
		pageInfo.comment = found.data;
		callback()
		})
	},function(){
		res.render("querybyheading",pageInfo);
	})
})
})
})
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
	pageInfo={};
    var items = [query_controller];
    async.each(items,function(item,callback){
item.getElementByUserId(req,(result)=>{
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
            res.render("querybyid",pageInfo);
        })    
    })
    })
    });



app.post("/commentposting1",isLoggedIn,(req,res)=>{
	comment_ctrl_query.insertComment(req,(found)=>{
		console.log(found.data);
		if(found.res){
		req.flash("message","You have inserted your query")
	res.redirect('/dashboard')
 }
 else{
      req.flash("message","Your  query has not been inserted try again")
	res.redirect('/dashboard')
 }
 
		
	});
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
app.get("/adminposting",isLoggedIn,(req,res)=>{
	library.getTag((result)=>{
		console.log(result.data[0]);
		res.render("adminposting",{"data":result.data,"data1":result.data1});
	})
});
app.post('/adminposting',(req,res)=>{
	admin_controller.saveMessage(req,(found)=>{
	   if(found.res){
		req.flash("message","You have inserted your query")
	res.redirect('/dashboard')}
	else{
	    req.flash("message","You have not inserted your query")
	res.redirect('/dashboard')
	}
	});
});

app.get("/replies",(req,res)=>{
	var pageInfo = {};
	reply.getPopulatedReply(req,(found)=>{
		pageInfo.data = found.data;
		res.render("replies",pageInfo)
	})
})
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
app.get('/getAdmin/mid/:mid',isLoggedIn,(req,res)=>{
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
				},
				function(){
				var items5 = [library];
				async.each(items5,function(item,callback){
					item.getTag((found)=>{
						console.log("--------------")
						console.log(found)
						pageInfo.tags = found.data;
						callback()
					})
			},function(){
				
			res.render("adminqueryheading",pageInfo);
})
		})
	})
})
})
});

app.post("/commentposting",isLoggedIn,(req,res)=>{
	comment_ctrl_admin.insertComment(req,(found)=>{
		console.log(found.data);
		if(found.res){
		req.flash("message","You have inserted your query")
	res.redirect('/dashboard')
 }
 else{
      req.flash("message","Your  query has not been inserted try again")
	res.redirect('/dashboard')
 }
 
	});
})
app.get("/enterVote",isLoggedIn,function(req,res){
	vote.insertVote(req,function(data){
		console.log(data)
	})
})

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


// Starting the server on a particular port
app.listen(port ,()=> {
		console.log('Server started on port '+ port);
});
