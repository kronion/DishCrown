var mongoose = require('mongoose');
var opts = { user: 'user', pass: 'vanilla' };
mongoose.connect('mongodb://localhost/product', opts);
var db = mongoose.connection;
exports.connect = db;

var Schema = mongoose.Schema;
var userSchema = Schema({
  username: String,
  password: String
});
var User = mongoose.model('User', userSchema);
exports.User = User;

/*db.on('error', console.error.bind(console, 'connection error: '));
exports.callback = db.once('open', function callback() {
  var userSchema = new Schema({username: String, password: String},
                              {collection: 'Users'});
  var User = mongoose.model('User', userSchema);
  exports.User = User;
});
*/
