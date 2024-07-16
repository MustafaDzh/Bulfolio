$(document).ready(function () {
  var player = videojs('my-video', {
    autoplay: true,
    muted: true, 
    controls: true, 
    preload: 'auto'
  });

  player.ready(function() {
    player.bigPlayButton.hide();
  });

  function togglePlayButton() {
    if (player.paused()) {
      $playBtn.fadeIn();
    } else {
      $playBtn.fadeOut();
    }
  }

  var $playBtn = $('.play-btn');

  $playBtn.click(function () {
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  });

  player.on('play', togglePlayButton);
  player.on('pause', togglePlayButton);

  player.on('ended', function() {
    $playBtn.fadeIn();
  });

  $('.question-text p').hide();

  $('.question').click(function() {
      var $this = $(this);
      var answer = $this.find('.question-text p');
      var arrow = $this.find('.arrow-icon');
  
      answer.slideToggle();
      $this.toggleClass('active');
      arrow.toggleClass('rotated');
  });
  

  var swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
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

  $('.links-list--item').hover(
    function() {
        var $dropdown = $(this).find('.dropdown-menu');
        var $icon = $(this).find('.dropdown-icon');
        $dropdown.stop(true, true).slideDown();
        $icon.addClass('rotated');
    },
    function() {
        var $dropdown = $(this).find('.dropdown-menu');
        var $icon = $(this).find('.dropdown-icon');
        $dropdown.stop(true, true).slideUp();
        $icon.removeClass('rotated');
    }
);

$('.offers-offer').hover(
  function() {
    $(this).siblings('.offers-offer').addClass('inactive');
    $(this).removeClass('inactive').addClass('active');
  },
  function() {
    $('.offers-offer').removeClass('inactive active');
  }
);
});