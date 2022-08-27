/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
$(document).ready(function () {
  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    tweets.map((tweet) => {
      let a = createTweetElement(tweet);
      $(".tweet-container").append(a);
    });
  };


  const createTweetElement = function (tweetData) {
    const countDate = function (t) {
      let date_1 = t.created_at;
      let date_2 = new Date();
      let difference = date_1 - date_2.getTime();
      return TotalDays = -Math.ceil(difference / (1000 * 3600 * 24));
    }

    let $tweet = /* Your code for creating the tweet element */
      `<article>
        <header class="tweet-header">
          <div class="img-and-name">
            <img src="${tweetData.user.avatars}" height="100%" style="padding-right: 0.4em">
            <p>${tweetData.user.name}</p>
          </div>
          <p class="img-and-name">${tweetData.user.handle}</p>
        </header>
        <div class="tweet-show">${tweetData.content.text}
        </div>
        <footer class="tweet-footer">
          <div>${countDate(tweetData)} days ago</div>
          <div>
            <i class="fa-solid fa-flag fa"></i>
            <i class="fa-solid fa-retweet fa"></i>
            <i class="fa-solid fa-heart fa"></i>
          </div>
        </footer>
      </article>`
    return $tweet;
  }

  renderTweets(data);
});