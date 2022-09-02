
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

  //slideToggle to control textarea showing or hiding
  $(".nav-bar-right").click(function () {
    $("form").slideToggle("fast", function () {
      $("textarea").focus();
    });
  })
  //adding a "return to top" function
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#log").fadeIn();
    } else {
      $("#log").fadeOut();
    }
  });

  $("#log").click(function () {
    //html works for FFX but not Chrome,body works for Chrome but not FFX
    $("html, body").animate({ scrollTop: 0 }, 300)
  })
});

