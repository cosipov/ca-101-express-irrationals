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

app.get('/dice', function(req, res) {
  res.render('math/dice', {rolls: '', list: [], sum: '', avg: ''});
})

app.post('/dice', function(req, res) {
  var list = utils.die(req.body.rolls);
  var sum = list.reduce(function(curr, prev){return curr+prev}, 0);
  var avg = list.reduce(function(prev, curr, i) { return (curr + i * prev) / (i + 1) }, 0);
  res.render('math/dice', {rolls: req.body.rolls, 'list': list, 'sum': sum, 'avg': avg});
})

app.post('/yoda', function(req, res) {
  unirest.get("https://yoda.p.mashape.com/yoda?sentence=" + req.body.phrase)
      .header("X-Mashape-Key", process.env.MASHAPE)
      .header("Accept", "text/plain")
      .end(function (result) {
        console.log(result.status, result.headers, result.body);
        res.send(result.body + '\n')
      });
});
app.get('/face', function(req, res) {
  res.render('home/face', {'url': '', result: ''});
})

app.post('/face', function(req, res) {
// These code snippets use an open-source library.
  unirest.get("https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?attribute=glass%2Cpose%2Cgender%2Cage%2Crace%2Csmiling&url=" + req.body.url)
      .header("X-Mashape-Key", process.env.MASHAPE)
      .header("Accept", "application/json")
      .end(function (result) {
        res.render('home/face', {'url': req.body.url, 'result': result});
        console.log(result.status, result.headers, result.body);
      });
})

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
