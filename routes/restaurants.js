var Restaurant = require('../models/db').Restaurant;

var makeJSON = function(restaurant) {

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

  return ({ restaurant: restaurant,
            rating: rating,
            pricepoint: pricepoint });
};

module.exports = function(req, res) {
  Restaurant.findOne({ id: req.params.name.toLowerCase() },
                      function(err, restaurant) {
    if (err) {
      console.error.bind(console, 'query failed:');
    }
    else {
      res.render('restaurant', makeJSON(restaurant));
    }
  });
};
