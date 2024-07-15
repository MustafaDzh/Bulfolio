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
  var $questions = $('.question');
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

  $questions.click(function() {
    var $this = $(this);
    var answer = $this.find('.question-text p');
    var arrow = $this.find('.arrow-icon');

    answer.slideToggle();
    $this.toggleClass('active');
    arrow.toggleClass('rotated');

    $questions.not($this).removeClass('active').find('.question-text p').slideUp();
    $questions.not($this).find('.arrow-icon').removeClass('rotated');
  });

  var swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
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
    var $this = $(this);
    var $dropdown = $this.siblings('.dropdown-menu');
    var $icon = $this.find('.dropdown-icon');

    $dropdownMenus.not($dropdown).slideUp();
    $dropdown.slideToggle();
    $icon.toggleClass('rotated');
    $dropdownIcons.not($icon).removeClass('rotated');
  });

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
      $this.find('.offer-specifics, .line').fadeIn();
    },
    function() {
      $('.offer-specifics, .line').fadeOut();
    }
  );
});