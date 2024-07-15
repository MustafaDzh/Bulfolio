$(document).ready(function () {
  var player = videojs('my-video');

  function togglePlayButton() {
    if (player.paused()) {
      $playBtn.fadeIn(); 
    } else {
      $playBtn.fadeOut(); 
    }
  }

  var $playBtn = $('.play-btn');
  var $dropdownMenus = $('.dropdown-menu');
  var $dropdownIcons = $('.dropdown-icon');
  var $offers = $('.offers-offer');

  $playBtn.click(function () {
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  });

  player.on('play', togglePlayButton);
  player.on('pause', togglePlayButton);

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

  $(document).click(function (event) {
    if (!$(event.target).closest('.links-list--item').length) {
      $dropdownMenus.slideUp();
      $dropdownIcons.removeClass('rotated');
    }
  });

  $offers.hover(
    function() {
      var $this = $(this);
      $this.addClass('active').removeClass('inactive'); 
      $offers.not($this).addClass('inactive').removeClass('active');
      $this.find('.offer-specifics').fadeIn();
    },
    function() {
      $('.offer-specifics').fadeOut();
    }
  );
});