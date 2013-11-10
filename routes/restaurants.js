var db = require('../models/db');
var Restaurant = db.Restaurant;
var Review = db.Review;
var User = db.User;
var ObjectId = db.ObjectId;

var makeJSON = function(req, restaurant, user, allReviews) {

  var logged_in;
  if (req.session.passport.user) {
    logged_in = 1;
  }
  else logged_in = 0;

  var cookie = logged_in;
  var flash = req.flash();

  if (user && allReviews) {
    return ({ cookie: cookie,
              flash: flash,
              restaurant: restaurant,
              name: user.realname,
              userscore: user.score, 
              reviews: allReviews
            });
  }
  else return ({ cookie: cookie,
                 flash: flash,
                 restaurant: restaurant
               });
};

function recurseDishes (i, len, allReviews, user, dishes, phoneNumber,
                        restaurant, req, res, callback) {
  if (i < len) {
    if (phoneNumber == dishes[i].slice(0, 10)) {
      Review.findOne({ 'id': dishes[i], 'user': user }, function(err, review) {
        if (err) {
          callback({ error : 'Database failure: could not look up dish reviews' });
        }
        else {
          //console.log(review);
          allReviews.uDishes.push(review);
          recurseDishes(i+1, len, allReviews, user, dishes, phoneNumber,
                        restaurant, req, res, callback);
        }
      });
    }
    else {
      recurseDishes(i+1, len, allReviews, user, dishes, phoneNumber,
                    restaurant, req, res, callback);
    }
  }
  else {
    callback(allReviews, restaurant, req, res);
  }
}

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
      if (req.session.passport.user) {
        User.findOne({ '_id' : new ObjectId(req.session.passport.user) },
                      function(err, user) {
          if (err) {
            req.flash('error', 'Database error: could not load user data');
          }
          else {
            var unformattedNum = restaurant.contact.number.replace(/-/g, "");
            recurseDishes(0, user.reviews.dishes.length, {uDishes: []}, 
                          req.session.passport.user, user.reviews.dishes,
                          unformattedNum, restaurant, req, res,
                          function (allReviews, restaurant, req, res) {
                if (allReviews.error) {
                  req.flash('error', allReviews.error);
                }
                else {
                  res.render('menu', makeJSON(req, restaurant, user, allReviews));
                }
            });
          }
        });
      }
      else {
        res.render('menu', makeJSON(req, restaurant));
      }
    }
  });
};
