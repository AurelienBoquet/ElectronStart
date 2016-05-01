var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var serveStatic = require('serve-static')

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(serveStatic(__dirname + '/'));

app.listen(8080, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:8080');
});
