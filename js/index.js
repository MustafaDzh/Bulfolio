$(document).ready(function () {
  var player = videojs('my-video');

  function togglePlayButton() {
    if (player.paused()) {
      $('.play-btn').fadeIn(); 
    } else {
      $('.play-btn').fadeOut(); 
    }
  }

  $('.play-btn').click(function () {
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  });

  player.on('play', function () {
    togglePlayButton();
  });

  player.on('pause', function () {
    togglePlayButton();
  });

  $('.question-text p').hide();

  $('.question').click(function() {
    var answer = $(this).find('.question-text p');
    answer.slideToggle();

    $(this).toggleClass('active');

    var arrow = $(this).find('.arrow-icon');
    arrow.toggleClass('rotated');

    $('.question').not(this).removeClass('active');
    $('.question').not(this).find('.question-text p').slideUp();
    $('.question').not(this).find('.arrow-icon').removeClass('rotated');
  });

  var swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    // autoplay: {
    //     delay: 3000,
    //     disableOnInteraction: false,
    // },
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

  $('.offers-offer').hover(
    function() {
      $(this).addClass('active').removeClass('inactive'); 
      $('.offers-offer').not(this).addClass('inactive').removeClass('active');

      $(this).find('.offer-specifics').fadeIn();
      $(this).find('.line').fadeIn();
    },
    function() {
      $('.offer-specifics').fadeOut();
      $('.line').fadeOut();
    }
  );
});