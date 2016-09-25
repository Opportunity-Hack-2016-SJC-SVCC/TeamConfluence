
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var google= require("googleapis");
var https= require('https');
var session= require('express-session');

var app = express();

// all environments
app.set('port', process.env.PORT || 9000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(session({secret: "qweqsdfdsfsd2132f", resave: false, saveUninitialized: true,cookieName: 'session', secret: 'cmpe273_test_string', duration: 30 * 60 * 1000,activeDuration: 5 * 60 * 1000}));
app.use(app.router);
app.use(express.static(path.join(__dirname, '/views')));
// app.use(express.static(__dirname + '/views'));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/asset', user.getasset);
app.get('/user',user.getuser);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

  var OAuth2 = google.auth.OAuth2;

  var oauth2Client = new OAuth2("272080382286-piplp1ok4khoduap6qq4db34brjm89j3.apps.googleusercontent.com", "hHA9MJTwRMTjMPWZhAAn9oGq" , "http://localhost:3000/oauthcallback");

  // generate a url that asks permissions for Google+ and Google Calendar scopes
  var scopes = [
  'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
  ];

  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes // If you only need one scope you can pass it as string
  });

  app.get('/url',function (req,res) {
  	res.send(url);
  });

  app.get('/oauthcallback',function (req,res) {
  	var code= req.param("code");
  	console.log("url="+code);
  	oauth2Client.getToken(code, function(err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    if(!err) {
      oauth2Client.setCredentials(tokens);
    	var apiUrl1= "/oauth2/v1/userinfo?access_token="+tokens.access_token;
    }  
    var email="";

      var options = {
          host :  'www.googleapis.com',
          path : apiUrl1,
          method : 'GET'
      }
   
      //making the https get call
      var getReq = https.request(options, function(resp) {
          console.log("\nstatus code: ", resp.statusCode);
          resp.on('data', function(data) {
          	email=JSON.parse(data).email;
              req.session.username= email; 
              console.log( "session ready "+req.session.username );
      		res.redirect('/home');

          });
      });
   
      //end the request
      getReq.end();
      getReq.on('error', function(err){
          console.log("Error: ", err);
      }); 
    
  });
  });



  app.get('/home',function (req,res) {
  	
  	console.log("user: "+req.session.username);
  	if(!req.session.username){
  		console.log("not found");
  		return res.status(401).send();
  	}

  	else{
  		console.log("yahan");
  		res.render('index');
  	}
});

  app.get('/admin',function(req,res){
    console.log("agaya");
    res.sendfile('./views/admin.html');  
  });
