/* Express */
var express = require('express');
var app = module.exports = express();
app.use(express.compress());
app.use(express.static(__dirname + '/public'));
//using jade
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

/* HTTPS */
var http = require('http');
var https = require('https'),
fs = require('fs');
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
http.createServer(app).listen(8000);
https.createServer(options, app).listen(44300);

/* HTTPS Redirects */
function requireHTTPS(req, res, next) {
  if (!res.socket.pair.ssl) {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
app.use(requireHTTPS);

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

// Reviews
var reviews = require('./routes/reviews');

/* DB connect, on callback start routing */
connect.on('error', console.error.bind(console, 'connection error:'));
connect.once('open', function callback() {
  
  // Home
  app.get('/', function (req, res) {
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

  // Dish Reviews
  app.post('/reviewdish', reviews.dishreviews);

});
