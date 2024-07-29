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

  $hamburgerBtn.on('change', function () {
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

  $('.question').click(function () {
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
    slidesPerView: 3,
    spaceBetween: 95,
    centeredSlides: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: '.swiper-paginationP',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
      dynamicBullets: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
        spaceBetween: 65,
      },
      1025: {
        slidesPerView: 3,
        spaceBetween: 65,
      }
    }
  });

  // DROPDOWN MENU
  // $('.links-list--item').hover(
  //   function () {
  //     var $icon = $(this).find('.dropdown-icon');
  //     $icon.addClass('rotated');
  //   },
  //   function () {
  //     var $icon = $(this).find('.dropdown-icon');
  //     $icon.removeClass('rotated');
  //   }
  // );

  // PORTFOLIO SWIPER SVG EFFECT
  $('.swiper-slide').hover(
    function () {
      $('.portfolio-svg').css('transform', 'rotate(45deg)');
    },
    function () {
      $('.portfolio-svg').css('transform', 'none');
    }
  );

  // FORM VALIDATION
  $('.upload').on('click', function () {
    $('#file-upload').click();
  });

  // Display uploaded image
  $('#file-upload').on('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      $('#uploaded-image-container').html(`<img src="${e.target.result}" alt="Uploaded Image">`);
    };
    reader.readAsDataURL(file);
  });

  // Trigger form submission on text-container click
  $('.text-container').on('click', function () {
    console.log("Text container clicked, validating form...");

    if (validateForm()) {
      console.log("Form is valid");
      $('#contact-form').trigger('reset');
      resetValidationStyles();
      $('#uploaded-image-container').html('');
      $('#thank-you-message').show();
    } else {
      console.log("Form is invalid");
    }
  });

  // Real-time validation
  $('#name, #email, #phone, #message').on('input blur', function () {
    validateField($(this));
  });

  $('input[name="radio-group"]').on('change', function () {
    validateRadio();
  });

  $('#agree_terms').on('change', function () {
    validateCheckbox();
  });

  function validateForm() {
    var isValid = true;
    resetValidationStyles();

    // Validate each field
    if (!validateField($('#name'))) isValid = false;
    if (!validateField($('#email'))) isValid = false;
    if (!validateField($('#phone'))) isValid = false;
    if (!validateField($('#message'))) isValid = false;
    if (!validateRadio()) isValid = false;
    if (!validateCheckbox()) isValid = false;

    return isValid;
  }

  function validateField(field) {
    var isValid = true;
    var id = field.attr('id');
    var value = field.val().trim();

    switch (id) {
      case 'name':
        if (value === '') {
          isValid = false;
          field.addClass('error').removeClass('valid');
        } else {
          field.removeClass('error').addClass('valid');
        }
        break;
      case 'email':
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === '' || !emailRegex.test(value)) {
          isValid = false;
          field.addClass('error').removeClass('valid');
        } else {
          field.removeClass('error').addClass('valid');
        }
        break;
      case 'phone':
        var phoneRegex = /^[0-9]{10}$/;
        if (value === '' || !phoneRegex.test(value)) {
          isValid = false;
          field.addClass('error').removeClass('valid');
        } else {
          field.removeClass('error').addClass('valid');
        }
        break;
      case 'message':
        if (value === '') {
          isValid = false;
          field.addClass('error').removeClass('valid');
        } else {
          field.removeClass('error').addClass('valid');
        }
        break;
    }

    return isValid;
  }

  function validateRadio() {
    var isValid = true;
    var radioChecked = $('input[name="radio-group"]:checked').length > 0;

    if (!radioChecked) {
      isValid = false;
      $('.inputs').addClass('error');
    } else {
      $('.inputs').removeClass('error');
    }

    return isValid;
  }

  function validateCheckbox() {
    var isValid = $('#agree_terms').is(':checked');

    if (!isValid) {
      $('#terms-error').show();
    } else {
      $('#terms-error').hide();
    }

    return isValid;
  }

  function resetValidationStyles() {
    $('.form-control').removeClass('error valid');
    $('.inputs').removeClass('error');
    $('#terms-error').hide();
  }

  // Show More Button for Defence Cars
  $('.defence-car_third .card .desc').each(function () {
    var $desc = $(this);
    var $showMoreButton = $('<div class="show-more">Покажи повече</div>');
    $desc.parent().append($showMoreButton);

    function updateButtonVisibility() {
      var isOverflowing = $desc[0].scrollHeight > $desc[0].clientHeight;
      $showMoreButton.toggle(isOverflowing);
    }

    updateButtonVisibility();

    $showMoreButton.on('click', function () {
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
  var swiperMobile = new Swiper('.offers-content_swiper', {
    effect: 'cube',
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94
    },
    loop: false,
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.offer-swiper-navigation_buttons-next',
      prevEl: '.offer-swiper-navigation_buttons-prev',
  },
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
    speed: 800,
  });

  // MOBILE INTERACTIONS
  function handleOffersClick() {
    $('.offers-offer').off('click').on('click', function () {
      var $this = $(this);

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
