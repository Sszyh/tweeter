
$(document).ready(function () {
  $("#tweet-text").on('input', function () {
    let content = $(this).val();
    let count = 140 - content.length;
    //add listen, using html() to write new innertext.
    $(".counter").html(count);
    if (count < 0) {
      $("output").addClass("red-counter");
    } else {
      $("output").removeClass("red-counter");
    }
  });
});