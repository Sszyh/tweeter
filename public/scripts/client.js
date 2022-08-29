/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  tweets.map((tweet) => {
    let a = createTweetElement(tweet);
    $(".tweet-container").prepend(a);
  });
};

const createTweetElement = function (tweetData) {
  //create function to avoid Cross-Site Scripting(XSS)
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  let $tweet = /* creating the tweet element */
    `<article>
        <header class="tweet-header">
          <div class="img-and-name">
            <img src="${tweetData.user.avatars}" height="100%" style="padding-right: 0.4em">
            <p>${tweetData.user.name}</p>
          </div>
          <p class="img-and-name">${tweetData.user.handle}</p>
        </header>
        <div class="tweet-show">${escape(tweetData.content.text)}
        </div>
        <footer class="tweet-footer">
          <div>${timeago.format(tweetData.created_at)}</div>
          <div>
            <i class="fa-solid fa-flag fa"></i>
            <i class="fa-solid fa-retweet fa"></i>
            <i class="fa-solid fa-heart fa"></i>
          </div>
        </footer>
      </article>`
  return $tweet;
}

$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    let a = $("#tweet-text").val();
    console.log("a:", a);
    $("textarea").focus(function() {
      $('.err').hide("fast");
      $('.err').html('');
    })
    if (a.length === 0) {
      //alert("Input should not be empty")
      $('.err').show("fast");
      $('.err').html('Input should not be empty');
    }
    $.post("/tweets", $(this).serialize(), function () {
      loadTweets();
    
    });
  
  });

  const loadTweets = function () {
    console.log("load tweet!");
    $.ajax("/tweets", { method: "GET" })
      .then(function (tweetArr) {
        renderTweets(tweetArr);
      });
  }

  loadTweets();//why it needs to be loaded
});
