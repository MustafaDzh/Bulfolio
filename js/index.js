$(document).ready(function () {
  var player = videojs('my-video');

  $('.question-text p').hide();

  $('.arrow-icon').click(function () {
    $(this).toggleClass('rotated');
    var question = $(this).closest('.question');
    $(this).siblings('.question-text').children('p').slideToggle();
    question.toggleClass('active');
    $('.question').not(question).removeClass('active');
  });

  var swiper = new Swiper('.car-swiper_container', {
    loop: true,
    slidesPerView: 1.3,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    preloadImages: true,
    updateOnImagesReady: true,
    loopAdditionalSlides: 1,
  });
});
