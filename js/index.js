$(document).ready(function () {

  // MOBILE NAV
  const $hamburgerBtn = $('#check-icon');
  const $mobileNav = $('.header-container--mobile');
  const $bars = $('.bar');

  function toggleMenu() {
    if ($hamburgerBtn.is(':checked')) {
      $mobileNav.addClass('open');
      $bars.addClass('cross');
      $('html').addClass('no-scroll');
      $('body').addClass('no-scroll');
    } else {
      $mobileNav.removeClass('open');
      $bars.removeClass('cross');
      $('html').removeClass('no-scroll');
      $('body').removeClass('no-scroll');
    }
  }

  $hamburgerBtn.on('change', function() {
    toggleMenu();
  });

  // VIDEO PLAYER
  var player = videojs('my-video', {
    autoplay: true,
    muted: true, 
    controls: true, 
    preload: 'auto'
  });

  // QUESTION OPENING
  $('.question-text .answer').hide();

  $('.question').click(function() {
    var $this = $(this);
    var answer = $this.find('.question-text .answer');
    var arrow = $this.find('.arrow-icon');
  
    answer.slideToggle();
    $this.toggleClass('active');
    arrow.toggleClass('rotated');
  });
  
  // PORTFOLIO SWIPER
  var swiper = new Swiper('.portfolio-container', {
    loop: true,
    slidesPerView: 3.34,
    spaceBetween: 95,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
      },
      1024: {
        slidesPerView: 2.8,
        spaceBetween: 65,
      },
      1280: {
        slidesPerView: 2.9,
        spaceBetween: 65,

      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 65,
      },
      1540: {
        slidesPerView: 3.2,
        spaceBetween: 65,
      },
      1740: {
        slidesPerView: 3.4,
        spaceBetween: 65,
      },
    }
  });
  
  // DROPDOWN MENU
  $('.links-list--item').hover(
    function() {
      var $icon = $(this).find('.dropdown-icon');
      $icon.addClass('rotated');
    },
    function() {
      var $icon = $(this).find('.dropdown-icon');
      $icon.removeClass('rotated');
    }
  );

  // OFFERS HOVER for DESKTOP
  $('.offers-offer').hover(
    function() {
      $(this).addClass('active').siblings('.offers-offer').addClass('inactive');
    },
    function() {
      $('.offers-offer').removeClass('inactive active');
    }
  );

  // PORTFOLIO SWIPER SVG EFFECT
  $('.swiper-slide').hover(
    function() {
      $('.portfolio-svg').css('transform', 'rotate(45deg)');
    },
    function() {
      $('.portfolio-svg').css('transform', 'none');
    }
  );

  // FORM VALIDATION
  $('.upload').on('click', function() {
    $('#file-upload').click();
  });

  $('#file-upload').on('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      $('#uploaded-image-container').html(`<img src="${e.target.result}" alt="Uploaded Image">`);
    };
    reader.readAsDataURL(file);
  });

  $('#contact-form').submit(function(event) {
    event.preventDefault();
    if (validateForm()) {
      $(this).trigger('reset'); 
      resetValidationStyles(); 
      $('#uploaded-image-container').html(''); 
      $('#thank-you-message').show(); 
    }
  });

  function validateForm() {
    var isValid = true;
    resetValidationStyles();

    // Validate Name
    if ($('#name').val().trim() === '') {
      isValid = false;
      $('#name').addClass('error');
    } else {
      $('#name').removeClass('error');
    }

    // Validate Email
    var email = $('#email').val().trim();
    if (email === '') {
      isValid = false;
      $('#email').addClass('error');
    } else {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        isValid = false;
        $('#email').addClass('error');
      } else {
        $('#email').removeClass('error');
      }
    }

    // Validate Phone (optional)
    var phone = $('#phone').val().trim();
    var phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      isValid = false;
      $('#phone').addClass('error');
    } else {
      $('#phone').removeClass('error');
    }

    var radioChecked = false;
    $('input[name="radio-group"]').each(function() {
      if ($(this).is(':checked')) {
        radioChecked = true;
      }
    });
    if (!radioChecked) {
      isValid = false;
      $('.inputs').addClass('error');
    } else {
      $('.inputs').removeClass('error');
    }

    // Validate Message
    var message = $('#message').val().trim();
    if (message === '') {
      isValid = false;
      $('#message').addClass('error');
    } else {
      $('#message').removeClass('error');
    }

    // Validate Checkbox (terms agreement)
    if (!$('#agree_terms').is(':checked')) {
      isValid = false;
      $('#terms-error').show(); 
    } else {
      $('#terms-error').hide();
    }

    return isValid;
  }

  function resetValidationStyles() {
    $('.form-control').removeClass('error');
    $('.inputs').removeClass('error');
    $('#terms-error').hide();
  }

  // Show More Button for Defence Cars
  $('.defence-car_third .card .desc').each(function() {
    var $desc = $(this);
    var $showMoreButton = $('<div class="show-more">Покажи повече</div>');
    $desc.parent().append($showMoreButton);

    function updateButtonVisibility() {
      var isOverflowing = $desc[0].scrollHeight > $desc[0].clientHeight;
      $showMoreButton.toggle(isOverflowing);
    }

    updateButtonVisibility();

    $showMoreButton.on('click', function() {
      if ($desc.hasClass('expanded')) {
        $desc.removeClass('expanded');
        $(this).text('Покажи повече');
      } else {
        $desc.addClass('expanded');
        $(this).text('Покажи по-малко');
      }
    });

    $(window).on('resize', updateButtonVisibility);
  });

  // OFFERS SWIPER MOBILE
  var newSwiper = new Swiper('.offers-content_swiper', {
    loop: false,
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },
    centeredSlides: true, 
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    observer: true,
    observeParents: true,
  });

  // MOBILE INTERACTIONS
  function handleOffersClick() {
    $('.offers-offer').off('click').on('click', function() {
      var $this = $(this);

      // On mobile, toggle the active class
      $('.offers-offer').not($this).removeClass('active');
      $this.toggleClass('active');
    });
  }

  function updateEventHandlers() {
    if (window.innerWidth <= 1024) {
      handleOffersClick();
    } else {
      $('.offers-offer').off('click');
    }
  }

  updateEventHandlers();
  $(window).on('resize', updateEventHandlers);
});
