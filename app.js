
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var job_desc = require('./routes/job_desc');
var login = require('./routes/login');
var bookmarks = require('./routes/bookmarks');
var bookmark_jobDesc = require('./routes/bookmark_jobDesc');
var appHistory = require('./routes/appHistory');
var appHistory_jobDesc = require('./routes/appHistory_jobDesc');
var profile = require('./routes/profile');
var addBookmark = require('./routes/addBookmark');
var landing = require('./routes/landing');
var apply = require('./routes/apply');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
        extended: true
}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', landing.view);
app.get('/index', index.view);
app.get('/index/:search_param', index.view_search);
app.get('/indexAlt', index.viewAlt);
app.get('/job_desc/:jobid', job_desc.view);
app.get('/login', login.view);
app.post('/login', login.check_login);
app.get('/bookmarks', bookmarks.view);
app.get('/bookmark_jobDesc', bookmark_jobDesc.view);
app.get('/appHistory', appHistory.view);
app.get('/appHistory_jobDesc', appHistory_jobDesc.view);
app.get('/profile', profile.view);
app.get('/addBookmark/:jobid/:prevPage', addBookmark.view);
app.post('/apply', apply.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
