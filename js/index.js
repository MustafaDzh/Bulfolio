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
  $('.links-list--item > a').click(function (event) {
    event.preventDefault();
    var $dropdown = $(this).siblings('.dropdown-menu');
    var $icon = $(this).find('.dropdown-icon');
    $('.dropdown-menu').not($dropdown).slideUp(); 
    $dropdown.slideToggle(); 
    $icon.toggleClass('rotated');
    $('.dropdown-icon').not($icon).removeClass('rotated');
  });

  $(document).click(function (event) {
    if (!$(event.target).closest('.links-list--item').length) {
      $('.dropdown-menu').slideUp();
      $('.dropdown-icon').removeClass('rotated');
    }
  });
});
