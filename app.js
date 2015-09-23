/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */

var express = require('express');
var cfenv = require('cfenv');
var bodyParser = require('body-parser');
var multer = require('multer');
var request = require('request');
var methodOverride = require('method-override');
var morgan = require('morgan');
var unirest = require('unirest');

var utils = require('./public/js/util');

var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

var appEnv = cfenv.getAppEnv();
var server = app.listen(appEnv.port, function() {
  console.log('***********************************');
  console.log('listening:', appEnv.url);
  console.log('***********************************');
});

module.exports = server;

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */

app.get('/', function(req, res){
  res.render('home/index');
});

app.get('/square', function(req, res){
  res.render('math/square', {square: null});
});

app.post('/square', function(req, res){
  console.log(req.body);
  var square = req.body.x * req.body.x;
  res.render('math/square',{square: square});
});

app.get('/distance', function(req, res) {
  res.render('math/distance', {distance: '', 'x1': '',
    'y1': '', 'x2': '', 'y2': ''});
});

app.post('/distance', function(req, res) {
  console.log('post - distance')
  var distance = utils.distance({'x': req.body.x1, 'y': req.body.y1},
                                {'x': req.body.x2, 'y': req.body.y2});
  res.render('math/distance', {'distance': distance, 'x1': req.body.x1,
    'y1': req.body.y1, 'x2': req.body.x2, 'y2': req.body.y2});
})








/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
