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
      1024: {
        slidesPerView: 3,
        spaceBetween: 65,
      }
    }
  });

  // DROPDOWN MENU
  $('.links-list--item').hover(
    function () {
      var $icon = $(this).find('.dropdown-icon');
      $icon.addClass('rotated');
    },
    function () {
      var $icon = $(this).find('.dropdown-icon');
      $icon.removeClass('rotated');
    }
  );

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
  $('.upload').on('click', function() {
    $('#file-upload').click();
});

// Display uploaded image
$('#file-upload').on('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        $('#uploaded-image-container').html(`<img src="${e.target.result}" alt="Uploaded Image">`);
    };
    reader.readAsDataURL(file);
});

// Trigger form submission on text-container click
$('.text-container').on('click', function() {
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

function validateForm() {
    var isValid = true;
    resetValidationStyles();

    // Validate Name
    if ($('#name').val().trim() === '') {
        isValid = false;
        $('#name').addClass('error').removeClass('valid');
        console.log("Name is invalid");
    } else {
        $('#name').removeClass('error').addClass('valid');
    }

    // Validate Email
    var email = $('#email').val().trim();
    if (email === '') {
        isValid = false;
        $('#email').addClass('error').removeClass('valid');
        console.log("Email is empty");
    } else {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            $('#email').addClass('error').removeClass('valid');
            console.log("Email format is invalid");
        } else {
            $('#email').removeClass('error').addClass('valid');
        }
    }

    // Validate Phone (mandatory)
    var phone = $('#phone').val().trim();
    var phoneRegex = /^[0-9]{10}$/;
    if (phone === '' || !phoneRegex.test(phone)) {
        isValid = false;
        $('#phone').addClass('error').removeClass('valid');
        console.log("Phone is invalid");
    } else {
        $('#phone').removeClass('error').addClass('valid');
    }

    // Validate Message (mandatory)
    var message = $('#message').val().trim();
    if (message === '') {
        isValid = false;
        $('#message').addClass('error').removeClass('valid');
        console.log("Message is empty");
    } else {
        $('#message').removeClass('error').addClass('valid');
    }

    // Validate Radio Buttons
    var radioChecked = false;
    $('input[name="radio-group"]').each(function() {
        if ($(this).is(':checked')) {
            radioChecked = true;
        }
    });
    if (!radioChecked) {
        isValid = false;
        $('.inputs').addClass('error');
        console.log("Radio button not selected");
    } else {
        $('.inputs').removeClass('error');
    }

    // Validate Checkbox (terms agreement)
    if (!$('#agree_terms').is(':checked')) {
        isValid = false;
        $('#terms-error').show();
        console.log("Terms not agreed");
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
    loop: false,
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (className) {
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
