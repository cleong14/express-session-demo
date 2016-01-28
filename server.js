// basic express server setup (1-4)

// =======1=======
var express = require('express');
// =======1=======

var bodyParser = require('body-parser');
var session = require('express-session');

// =======2=======
var PORT = 3000;
// =======2=======

// =======3=======
var app = express();
// =======3=======

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// finds things in body
app.use(bodyParser.urlencoded({extended: false}));

var COOKIE_MAX_AGE = 3600000;

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    httpOnly:true,
    maxAge: COOKIE_MAX_AGE
  }
}));

// basic page counter (5-6)
// =======5=======
var count = 0;
// =======5=======

// =======6=======
app.get('/', function (req, res) {
  count += 1;
  res.end('You are visitor: ' + count);
});
// =======6=======

app.get('/name', function (req, res) {
  console.log(req.session);
  // renders a view and sends rendered HTML string to client
  // basically renders the page so that it can be dispalyed on the browser
  res.render('get-name');
});

app.post('/name', function (req, res) {
  // replaces req.body.name - this way can use this info later on a GET req
  // maxAge - max time in ms that the cookies can live before they get trashed
  // httpOnly - limits cookies to only be used on the browser
  req.session.name = req.body.name;
  console.log('setting name cookie');

  // redirects to greet page path rather than rendering the page
  res.redirect('/greet');
});

app.get('/greet', function (req, res) {
  // if no name cookie, itll kick you back to name page to input a name
  if (!req.session.name) {
    // return just makes sure code below return doesnt run
    // kind of like wrapping the code below in an else statement
    return res.redirect('/name');
  }

  // we dont use body on get requests!!
  // instead of body parser on get requests, use cookie parser
  res.render('greet', {name: req.session.name});
});

// =======4=======
var server = app.listen(PORT, function () {
  console.log('Listening on port', server.address().port);
});
// =======4=======