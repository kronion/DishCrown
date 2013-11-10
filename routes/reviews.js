var db = require('../models/db.js');
var Review = db.Review;
var User = db.User;
var Restaurant = db.Restaurant;
var ObjectId = db.ObjectId;

module.exports = {

  dishstars: function (req, res) {
    if (req.session.passport.user) {
      var userId = req.session.passport.user;
      Review.findOne({ id: req.body.id, user: userId,
                       type: 0 },
                        function (err, review) {
        if (err) {
          console.error.bind(console, 'query failed:');
        }
        else if (!review) {
          newReview = new Review({id: req.body.id,
                                  type: 0,
                                  contents: req.body.value,
                                  user: userId});
          newReview.save(function (err) {
            if (err) {
              console.error.bind(console, 'insert failed:');
              res.send({ error: 'Database failure: could not add review' });
            }
            else {
              // Send back new data
              var overAll;
              var reviewCount;              
              var userScore;

              // Update appropriate restaurant menu item
              Restaurant.findOne/*AndUpdate*/({ 'menu.id': req.body.id },
                        //{ $inc: { 'menu.$.reviewcount': 1,
                        //          'menu.$.overall': parseInt(req.body.value)}}, 
                          function (err, updatedRest) {
                if (err) {
                  console.error.bind(console, 'update failed:');
                  res.send({ error: 'Database failure: could not update reviews' });
                }
                else {
                  var lookup = {};
                  for (var i = 0, len = updatedRest.menu.length; i < len; i++) {
                    lookup[updatedRest.menu[i].id] = updatedRest.menu[i];
                  }
                  overAll = lookup[req.body.id].overall;
                  reviewCount = lookup[req.body.id].reviewcount;

                  // Update user reviews and score!
                  User.findOne/*AndUpdate*/({ '_id': new ObjectId(userId) },
                                         // { $inc: { 'score': 10 },
                                       //   $push: { 'reviews.dishes': req.body.id }},
                                            function (err, updatedUser) {
                    if (err) {
                      console.error.bind(console, 'update failed:');
                      res.send({error: 'Database failure: could not update user score'});
                    }
                    else {
                      userScore = updatedUser.score;

                      if (   typeof overAll == 'undefined'
                          || typeof reviewCount == 'undefined' 
                          || typeof userScore == 'undefined') {
                        console.log(overAll);
                        console.log(reviewCount);
                        console.log(userScore);
                        res.send({error: 'Database failure: could not create response'});
                      }
                      else {
                        res.send({ id: req.body.id,
                                   overall: overAll,
                                   reviewcount: reviewCount,
                                  userscore: userScore
                                });
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
    else {
      res.send({ error: 'Please log in to post your review!' });
    }
  },

  dishreviews: function(req, res) {
    if (req.session.passport.user) {
      Review.findOne({id: req.body.id, user: req.session.passport.user,
                      type: 1 },
                      function (err, review) {
        if (err) {
          console.error.bind(console, 'query failed:');
        }
        else if (!review) {
          newReview = new Review({id: req.body.id,
                                  type: 1,
                                  contents: req.body.contents,
                                  user: req.session.passport.user});
          newReview.save(function (err) {
            if (err) {
              console.error.bind(console, 'insert failed:');
              res.send({ error: 'Database failure: could not add review' });
            }
            else {
              // Update other dbs, more error handling...
              // Send back new data
              res.send({ error: 'Success!' });
            }
          });
        }
      });
    }
    else {
      res.send({ error: 'Please log in to post your review!' });
    }
  },

  restreviews: function (req, res) {

  }

}
