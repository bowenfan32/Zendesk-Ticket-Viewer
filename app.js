var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var zendesk = require('node-zendesk');
var dotenv = require('dotenv').config({path: __dirname + '/.env'});
var hbs = require('hbs');

// Handlebars helper
hbs.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,1);
    return new hbs.SafeString(theString);
});  

hbs.registerHelper("checkNull", function(val) {
    if(val === null) {
        return "-";
    } 
    return val; 
});

hbs.registerHelper("format", function(passedString) {
    var theString = passedString.replace(/(?:\r\n|\r|\n)/g, '<br />');
    return new hbs.SafeString(theString);
});

// Routes
var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
// Path redirections
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));

app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Calls API through Zendesk client
var client = zendesk.createClient({
  username:  process.env.EMAIL,
  token:  process.env.TOKEN,
  remoteUri: process.env.URL
});



// Returns a list of tickets
client.tickets.list(function (err, statusList, body, response, resultList) {
  if (err) {
    app.locals.err = err;
    console.log(err);
    return;
  }

  var tickets = [];
  var userList = [];
  
  for (var key in body) {
    ticketList = body[key];
    tickets[key] = ticketList;

    client.users.show(tickets[key].requester_id, function (err, req, result) {
        userList.push(result.name);
        app.locals.userList = userList;
    });
  }

  app.locals.tickets = tickets;
});

module.exports = app;



