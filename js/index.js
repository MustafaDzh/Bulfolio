$(document).ready(function() {

    var player = videojs('my-video');

    $('.question-text p').hide();

    $('.arrow-icon').click(function() {
      $(this).toggleClass('rotated');
      var question = $(this).closest('.question');
      $(this).siblings('.question-text').children('p').slideToggle();
      question.toggleClass('active');
      $('.question').not(question).removeClass('active');
  });
});
