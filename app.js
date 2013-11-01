// Express
var express = require('express');
var app = express();
app.use(express.compress());
app.use(express.static(__dirname + '/public'));
//using jade
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')



// Mongoose db
var db = require('./models/db');
var connect = db.connect;
var User = db.User;

// Passport user authentication
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

// Connect-flash, for passport messages
var flash = require('connect-flash');

// Passport configuration
app.configure(function() {
  app.use(express.cookieParser()); // Change?
  // Note: next two lines replace express.bodyParser(), which is deprecated
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.cookieSession({ secret: 'SECRET' })); // WTF IS THIS
  app.use(flash()); // Flash messages, not working yet
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
      // Are passwords being sent plaintext in form??
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// DB connect, on callback start routing
connect.on('error', console.error.bind(console, 'connection error: '));
connect.once('open', function callback() {
  
  // Home
  app.get('/', function(req, res) {
    res.render('index');
  });

  // Login    
  app.post('/login',
    passport.authenticate('local', { successRedirect: '/yay',
                                    failureRedirect: '/boo',
                                    failureFlash: true })
    );

  // Register
  app.post('/register', function(req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
      if (err) {
        console.error.bind(console, 'query failed: ');
      }
      if (!user) {
        newUser = new User({username: req.body.username, 
                            password: req.body.password});
        newUser.save(function (err) {
          // Probably doesn't handle error correctly, but it shouldn't happen
          // in practice so w/e
          if (err) {
            console.error('insert failed: ', err);
            res.send(503, 
                     { error: 'Database failure: could not register new user'});
          }
          else {
            console.log('user created');
            res.send('/');
          }
        });
      }
      else {
        console.error('preventing duplicate insert');
        res.send('/');
      }
    });
  });

  // Restaurants
  app.get('/restaurant', function(req, res) {
    res.render('restaurant');
  });

  // Menus
  app.get('/menu', function(req, res) {
    res.render('menu');
  });
});

app.listen(3000);
