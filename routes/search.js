var restaurants = require('./restaurants');

module.exports = function(req, res) {
  var id = req.param('restaurant').toLowerCase().replace(/\+/g, "%20");
  req.params.name = id;
  (restaurants)(req, res);
};
