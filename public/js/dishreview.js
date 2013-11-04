$(document).ready(function() {
  $('.dishsubmit').click(function(e) {

    var id = '#' + $(this).attr("id") + 'form';
    e.preventDefault();
    $.post( $(id).attr("action"), $(id).serialize(),
            function(result) { 
              if (true) {
                $(document.body).prepend(
                  "<div class=flash>" +
                    "<div class=alert alert-dismissable>" +
                      result.error +
                      "<button class=close type='button' data-dismiss='alert' aria-hidden='true'>" +
                        "x" +
                      "</button>" +
                    "</div>" +
                  "</div>"
                );
              }
            }
    );
  });
}); 
