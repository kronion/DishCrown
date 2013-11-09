// Mongoose Review schema
// ID
// CONTENTS
// USERNAME
var db = require('../models/db.js');
var Review = db.Review;
var User = db.User;

module.exports = {

  dishreviews: function(req, res) {
    console.log(req.body);
    res.send({ error: 'test' });
  }

}
