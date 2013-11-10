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
    var dish = '#' + $(this).attr("id").charAt(-2);
    var value = $(this).attr("id").slice(-1);
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
            }
    );
  });

  /* Handling written reviews */
  $('.dishsubmit').click(function(e) {

    var id = '#' + $(this).attr("id") + 'form';
    var request = {
      id: $(this).attr("id"),
      contents: $(id).children("textarea").val()
    }
    e.preventDefault();
    $.post( $(id).attr("action"), request,
            function(result) { 
              if (result.error) {
                errormessage(result.error);
              }

              //$('.close').click(function() {
              //  $('.container-fluid').css("padding-top", "0px");
              //});
            }
    );
  });
}); 
