var mongoose = require('mongoose');
var opts = { user: 'user', pass: 'vanilla' };
mongoose.connect('mongodb://localhost/product', opts);
var db = mongoose.connection;
exports.connect = db;

var Schema = mongoose.Schema; // Just shortens the code

// Users
var userSchema = Schema({
  username: String,
  password: String
});
var User = mongoose.model('User', userSchema);
exports.User = User;

// Restaurants
var restaurantSchema = Schema({
  name: String
});
var Restaurant = mongoose.model('Restaurant', restaurantSchema);
exports.Restaurant = Restaurant;
