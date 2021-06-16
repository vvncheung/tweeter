/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=> {

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').append($tweet);
    });
  };

  const createTweetElement = function(tweet) {
    let html = `
    <article class="tweet">
    <header>
      <div class="user">
        <img src="${tweet.user.avatars}" class="profile-pic"/> 
        <h1 id="name">${tweet.user.name}</h1>
      </div>
      <h1 id="username">${tweet.user.handle}</h1>
    </header>
    
    <div class="tweet-body">
      <p>${tweet.content.text}</p>
    </div>
    
    <footer>
      <p>
        ${timeago.format(tweet.created_at)}
      </p>
      <div>
        <i class="fab fa-font-awesome-flag" id="flag"></i> 
        <i class="fa fa-retweet" id="retweet"></i>  
        <i class="fa fa-heart" id="heart"></i>  
      </div>
    </footer>
    </article>
        `;
    return html;
  };

  renderTweets(data);
});

$( ".submit-button" ).submit(function( event ) {
  alert( "Handler for .submit() called." );
  event.preventDefault();
});

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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]