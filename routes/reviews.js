var db = require('../models/db.js');
var Review = db.Review;
var User = db.User;

module.exports = {

  dishstars: function (req, res) {
    Review.findOne({ id: req.body.id, user: req.session.passport.user,
                     type: 0 },
                    function (err, review) {
      if (err) {
        console.error.bind(console, 'query failed:');
      }
      else if (!review) {
        newReview = new Review({id: req.body.id,
                                type: 0,
                                contents: req.body.value,
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
  },

  dishreviews: function(req, res) {
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
  },

  restreviews: function (req, res) {

  }

}
