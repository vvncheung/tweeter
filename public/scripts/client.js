/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  $('.tweets-container').empty();
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $('.tweets-container').prepend($tweet);
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

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .done((data) => {
      console.log("success");
      renderTweets(data);
    })
    .fail(() => {
      console.log("fail");
    });
};

$(document).ready(()=> {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const $button = $(".submit-button");
  loadTweets();

  $('form').on("submit", function(event) {
    event.preventDefault();
    const safeString = `${escape($('#tweet-text').val())}`;
    $('#tweet-text').val(safeString);
    
    const serializedData = $('#tweet-text').serialize();
    let params = {
      method: 'POST',
      url: 'http://localhost:8080/tweets',
      data: serializedData
    };

    if ($('textarea').val() === "" || $('textarea').val() === null) {
      console.log("error")
      $(".error").slideDown("slow");
      $('.error-message').text('❌ Please enter a tweet.');
    }
    if ($('textarea').val().length >= 140) {
      $(".error").slideDown("slow");
      $('.error-message').text('❌ Too long! Your tweet cannot exceed 140 characters.');
    }
    if (($('textarea').val()) && ($('textarea').val().length < 140)) {
      $(".error").slideUp("slow");
      $.ajax(params)
        .done(() => {
          console.log("success");
          $('textarea').val("");
          loadTweets();
        })
        .fail(() => {
          console.log("fail");
        });
    }
  });
});