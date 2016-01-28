// basic express server setup (1-4)

// =======1=======
var express = require('express');
// =======1=======

var bodyParser = require('body-parser');

// =======2=======
var PORT = 3000;
// =======2=======

// =======3=======
var app = express();
// =======3=======

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: false}));

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
  // renders a view and sends rendered HTML string to client
  // basically renders the page so that it can be dispalyed on the browser
  res.render('get-name');
});

app.post('/name', function (req, res) {
  // req.body.name - takes info from req, parses the info, and grabs the name info from the req
  res.render('greet', {name: req.body.name});
});

// =======4=======
var server = app.listen(PORT, function () {
  console.log('Listening on port', server.address().port);
});
// =======4=======