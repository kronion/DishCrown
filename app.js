/* Express */
var express = require('express');
var app = module.exports = express();
app.use(express.compress());
app.use(express.static(__dirname + '/public'));
//using jade
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

/* Mongoose db */
var db = require('./models/db');
var connect = db.connect;

/* Routes */
// Authenticating and user signin
var authentication = require('./routes/authentication');
authentication.configure(app, express);

// Search
var search = require('./routes/search');

// Restaurants
var restaurants = require('./routes/restaurants');

/* DB connect, on callback start routing */
connect.on('error', console.error.bind(console, 'connection error:'));
connect.once('open', function callback() {
  
  // Home
  app.get('/', function(req, res) {
    var logged_in;
    if (req.session.passport.user) {
      logged_in = 1;
    }
    else logged_in = 0;

    res.render('index', { cookie: logged_in,
                          flash: req.flash()});
  });

  // Login    
  app.post('/login', authentication.login);

  // Logout
  app.get('/logout', authentication.logout);

  // Register
  app.post('/register', authentication.register);

  // Search
  app.get('/search', search);

  // Restaurants
  app.get('/restaurant/:name', restaurants);

  // Menus
  app.get('/menu', function(req, res) {
    res.render('menu');
  });
});

app.listen(3000);
