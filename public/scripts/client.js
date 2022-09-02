const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $(".tweet-container").empty();
  tweets.map((tweet) => {
    let a = createTweetElement(tweet);
    $(".tweet-container").prepend(a);
  });
};

const createTweetElement = function(tweetData) {
  //create function to avoid Cross-Site Scripting(XSS)
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  let $tweet = /* creating the tweet element */
    `<article>
        <div class="tweet-header">
          <div class="img-and-name">
            <img src="${tweetData.user.avatars}" height="100%" style="padding-right: 0.4em">
            <p>${tweetData.user.name}</p>
          </div>
          <p class="img-and-name">${tweetData.user.handle}</p>
        </div>
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
      </article>`;
  return $tweet;
};

$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    const a = $("#tweet-text").val();
    //check error of input nothing or exceed 140.
    $("textarea").focus(function() {
      $('.err').hide("slow");
      $('.err').html('');
    });
    if (a.length === 0) {
      $('.err').slideDown("slow");
      return $('.err').html('🧶🧶🧶  Input should not be empty');
    } else if (a.length > 140) {
      $('.err').slideDown("slow");
      return $('.err').html('🤐🤐🤐  Input should not be more than 140');
    }
    $.post("/tweets", $(this).serialize(), function() {
      loadTweets();
      $("textarea").val("");
      $(".counter").html(140);
    });

  });
  //get request to fetch the tweets data
  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" })
      .then(function(tweetArr) {
        renderTweets(tweetArr);
      });
  };

  loadTweets();//render the initial page first time.
});
