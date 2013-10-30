var express = require('express');
var app = express();
app.use(express.compress());
app.use(express.static(__dirname + '/public'));

var db = require('./models/db');
var User = db.User;

/* The following is a test of the passport authentication middleware */
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err); 
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
      
app.get('/test', function(req, res) {
  res.send('filetest');
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/fail',
                                   failureRedirect: '/',
                                   failureFlash: false })
);

app.listen(3000);
