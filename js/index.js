$(document).ready(function () {

  //VIDEO PLAYER
  var player = videojs('my-video', {
    autoplay: true,
    muted: true, 
    controls: true, 
    preload: 'auto'
  });

  // player.ready(function() {
  //   player.bigPlayButton.hide();
  // });

  // var $playBtn = $('.play-btn');

  // $playBtn.click(function () {
  //   if (player.paused()) {
  //     player.play();
  //   } else {
  //     player.pause();
  //   }
  // });

  //QUESTION OPENING
  $('.question-text p').hide();

  $('.question').click(function() {
      var $this = $(this);
      var answer = $this.find('.question-text p');
      var arrow = $this.find('.arrow-icon');
  
      answer.slideToggle();
      $this.toggleClass('active');
      arrow.toggleClass('rotated');
  });
  

  //PORTFOLIO SWIPER
  var swiper = new Swiper('.portfolio-container', {
    loop: true,
    slidesPerView: 3.34,
    spaceBetween: 95,
    // centeredSlides: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });

  //DROPDOWN MENU
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

//OFFERS HOVER

$('.offers-offer').hover(
  function() {
    $(this).addClass('active').siblings('.offers-offer').addClass('inactive');
  },
  function() {
    // Mouse leave: remove all classes
    $('.offers-offer').removeClass('inactive active');
  }
);

$('.swiper-slide').hover(
  function() {
      $('.portfolio-svg').css('transform', 'rotate(45deg)');
  },
  function() {
      $('.portfolio-svg').css('transform', 'none');
  }
);
});

//FORM VALIDATION
$(document).ready(function() {
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
});

