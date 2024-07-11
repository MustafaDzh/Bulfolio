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

  $('.offers-offer').hover(
    function() {
        $(this).addClass('active');
        $('.offers-offer').not(this).addClass('inactive'); 
    },
    function() {
        $('.offers-offer').removeClass('inactive'); 
    }
);
});
