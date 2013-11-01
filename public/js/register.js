$(document).ready(function() {
  $("#submit").click(function(e) {

    e.preventDefault(); // Prevents form from reloading page
    $.post( $("#register-form").attr("action"), $("#register-form").serialize(),
            function(data) { window.location = data; });
  });
});
