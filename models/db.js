var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var opts = { user: 'user', pass: 'vanilla' };
mongoose.connect('mongodb://localhost/product', opts);
var db = mongoose.connection;
exports.connect = db;

var Schema = mongoose.Schema; // Just shortens the code
exports.ObjectId = mongoose.Types.ObjectId; // Useful for searching by ObjectId

// Users
var userSchema = Schema({
  username: String,
  password: String,
  realname: String,
  score: Number,
  reviews: {
    dishes: [Schema.Types.Mixed],
    restaurants: [Schema.Types.Mixed]
  }
});
var User = mongoose.model('User', userSchema);
exports.User = User;

// Menus
var Menus = new Schema({
  id: Schema.Types.Long,
  type: String,
  name: String,
  price: Number,
  overall: Number,
  taste: Number,
  presentation: Number,
  value: Number,
  reviewcount: Number
});

// Restaurants
var restaurantSchema = Schema({
  id: { type: String, lowercase: true },
  name: String,
  image: String,
  rawscore: Number,
  reviewcount: Number,
  pricepoint: Number,
  contact: {
    number: String,
    address: String,
    website: String
  },
  menu: [Menus]
});
var Restaurant = mongoose.model('Restaurant', restaurantSchema);
exports.Restaurant = Restaurant;

// Reviews
var reviewSchema = Schema({
  id: Schema.Types.Mixed,
  type: Number,
  contents: String,
  user: String
});
var Review = mongoose.model('Review', reviewSchema);
exports.Review = Review;
