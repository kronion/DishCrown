var Restaurant = require('../models/db').Restaurant;

var makeJSON = function(restaurant, req) {

  var pricepoint;
  if (restaurant.pricepoint === 0) {
    pricepoint = '$';
  } else if (restaurant.pricepoint === 1) {
    pricepoint = '$$';
  } else if (restaurant.pricepoint === 2) {
    pricepoint = '$$$';
  } else if (restaurant.pricepoint === 3) {
    pricepoint = '$$$$';
  }
  var rating = restaurant.rawscore / restaurant.reviewcount;

  var logged_in;
  if (req.session.passport.user) {
    logged_in = 1;
  }
  else logged_in = 0;

  var cookie = logged_in;
  var flash = req.flash();

  return ({ cookie: cookie,
            flash: flash,
            restaurant: restaurant,
            rating: rating,
            pricepoint: pricepoint });
};

module.exports = function(req, res) {
  Restaurant.findOne({ id: req.params.name.toLowerCase() },
                      function(err, restaurant) {
    if (err) {
      console.error.bind(console, 'query failed:');
    }
    else if (!restaurant) {
    req.flash('error', 'Restaurant not found. Please search again.');
    res.redirect('/');
    }
    else {
      res.render('menu', makeJSON(restaurant, req));
    }
  });
};
