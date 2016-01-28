// basic express server setup (1-4)

// =======1=======
var express = require('express');
// =======1=======

// =======2=======
var PORT = 3000;
// =======2=======

// =======3=======
var app = express();
// =======3=======

// basic page counter (5-6)
// =======5=======
var count = 0;
// =======5=======

// =======6=======
app.get('/', function (req, res) {
  res.end('You are visitor: ' + count++);
});
// =======6=======

// app.get('/name', function (req, res) {
  
// });

// =======4=======
var server = app.listen(PORT, function () {
  console.log('Listening on port', server.address().port);
});
// =======4=======