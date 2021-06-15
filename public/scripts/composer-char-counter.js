$(document).ready(function() {

  $("textarea").keyup(function() {
   
    const totalChars = $(this).val().length;
    const charsRemaining = 140  - totalChars;
    let updatedCounter = $('#counter').html(charsRemaining);

    if (charsRemaining < 0) {
      updatedCounter.addClass('over-max');
    } else {
      updatedCounter.removeClass('over-max');
    }

  });

});

