$(document).ready(function() {
  $("#submit").click(function(e) {

    e.preventDefault(); // Prevents form from reloading page
    $.post( $("form").attr("action"), $("form").serialize(),
            function(data) { window.location = data; });
  });
});
