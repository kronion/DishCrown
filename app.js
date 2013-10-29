var express = require('express');
var app = express();
app.use(express.compress());

/* The following is a test of the passport authentication middleware */
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      


app.get('/', function(req, res) {
  res.send('Hello World');
});
app.get('/test', function(req, res) {
  res.send('filetest');
});

app.listen(3000);
