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
                $('.flash').append(
                  "<div class=alert alert-dismissable>" +
                    result.error +
                    "<button class=close type='button' data-dismiss='alert' aria-hidden='true'>" +
                      "x" +
                    "</button>" +
                  "</div>"
                );
              }

              $('.close').click(function() {
                $('.container-fluid').css("padding-top", "0px");
              });
            }
    );
  });
}); 
