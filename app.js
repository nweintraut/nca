
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.static(path.join(__dirname, 'public')));     
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.configure('production', function(){
  app.use(express.staticCache());
  app.use(express.static(path.join(__dirname, 'public')));  
  app.use(express.errorHandler());  
});

app.get('/', routes.index);
app.get('/page', routes.mrpage);
// app.get('/:page', routes.anypage);
// Limit route to those with only letters in it.
app.get('/:page([a-zA-Z]+)', routes.anypage);
app.get('/:page/:admin?', routes.anypageAdmin);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port') + " And mode: " + app.settings.env);
});
