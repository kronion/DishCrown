var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/product');
var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  var userSchema = new Schema({username: String, password: String},
                              {collection: 'Users'});
  var User = mongoose.model('User', userSchema);
  exports.User = User;
});
