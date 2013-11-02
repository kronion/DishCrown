$('.form-control').typeahead({
  name: 'restaurants',
  prefetch: {
    url: './assets/data/restaurants.json',
    ttl: 3600000
  }
});
