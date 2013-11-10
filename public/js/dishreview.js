$(document).ready(function() {

  /* Handling alerts snapped to top of window */
  // Cache selectors outside callback for performance. 
  var view = $(window),
 
  flashDiv = $('.flash'),
  divTop = flashDiv.offset().top;
  if (view.scrollTop() > 0) {
    flashDiv.toggleClass('sticky');
  }
  view.scroll(function() {
    flashDiv.toggleClass('sticky', view.scrollTop() > divTop);
  });

  /* Adding error messages to the flash div */
  function errormessage (message) {
    $('.flash').empty();
    $('.flash').append(
      "<div class=alert alert-dismissable>" +
        message +
        "<button class=close type='button' data-dismiss='alert' aria-hidden='true'>" +
          "x" +
        "</button>" +
      "</div>"
    );
  }

  /* Handling star reviews */
  $('.dishstars').click(function(e) {

    var id = '#' + $(this).attr("id").slice(0, -1) + 'stars';
    var dish = '#' + $(this).attr("id").slice(1, -1); 
    var value = 6 - parseInt($(this).attr("id").slice(-1));
    var request = {
      id: $(dish).attr("data-attribute"),
      value: value
    }
    e.preventDefault();
    $.post( $(id).attr("action"), request,
            function(result) {
              if (result.error) {
                errormessage(result.error);
              }
              else {
                // UPDATE RATING TOO!
                var score = '' + $('.pull-left').children().text();
                var keepFront = score.slice(0, score.indexOf(':')+1);
                keepFront = keepFront + result.userscore;
                $('.pull-left').children().html(keepFront);
              }
            }
    );
  });

  /* Handling written reviews */
  $('.dishsubmit').click(function(e) {

    var id = '#' + $(this).attr("id") + 'form';
    var dish = '#' + $(this).attr("id").slice(4);
    console.log($(dish).attr("data-attribute"));
    var request = {
      id: $(dish).attr("data-attribute"),
      contents: $(id).children("textarea").val()
    }
    e.preventDefault();
    $.post( $(id).attr("action"), request,
            function(result) { 
              if (result.error) {
                errormessage(result.error);
              }
              else {
                var score = '' + $('.pull-left').children().text();
                var keepFront = score.slice(0, score.indexOf(':')+1);
                keepFront = keepFront + result.userscore;
                $('.pull-left').children().html(keepFront);
              }
            }
    );
  });
}); 
