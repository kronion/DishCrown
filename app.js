// Express
var express = require('express');
var app = express();
app.use(express.compress());
app.use(express.static(__dirname + '/public'));

// Mongoose db
var db = require('./models/db');
var connect = db.connect;
var User = db.User;

// Passport user authentication
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

// Connect-flash, for passport messages
var flash = require('connect-flash');

// Passport authentication
app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.cookieSession({ secret: 'SECRET' }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
});
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new LocalStrategy(
 function(username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if (err) {
        return done(err); 
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

connect.on('error', console.error.bind(console, 'connection error: '));
connect.once('open', function callback() {
      
  app.post('/login',
    passport.authenticate('local', { successRedirect: '/yay',
                                    failureRedirect: '/boo',
                                    failureFlash: true })
  );
});

app.listen(3000);
