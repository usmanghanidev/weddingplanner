$(document).ready(function () {

  /* ===== PRELOADER ===== */
  setTimeout(function () {
    $('#preloader').addClass('hide');
    $('body').css('overflow', '');
  }, 1600);
  $('body').css('overflow', 'hidden');

  /* ===== NAVBAR SCROLL ===== */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 80) {
      $('#mainNav').addClass('scrolled');
      $('#backToTop').addClass('show');
    } else {
      $('#mainNav').removeClass('scrolled');
      $('#backToTop').removeClass('show');
    }
    revealElements();
  });

  /* ===== BACK TO TOP ===== */
  $('#backToTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  /* ===== REVEAL ON SCROLL ===== */
  function revealElements() {
    var windowBottom = $(window).scrollTop() + $(window).height();
    $('.reveal, .reveal-left, .reveal-right').each(function () {
      if ($(this).offset().top < windowBottom - 60) {
        $(this).addClass('visible');
      }
    });
  }
  revealElements();

  /* ===== COUNT UP ===== */
  var counted = false;
  function startCountUp() {
    if (counted) return;
    var $counters = $('#counters');
    if ($counters.length === 0) return;
    var countersTop = $counters.offset().top;
    if ($(window).scrollTop() + $(window).height() > countersTop + 100) {
      counted = true;
      $('.count-up').each(function () {
        var $el = $(this);
        var target = parseInt($el.data('target'));
        var duration = 2000;
        var step = target / (duration / 16);
        var current = 0;
        var timer = setInterval(function () {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          $el.text(Math.floor(current));
        }, 16);
      });
    }
  }
  $(window).on('scroll', startCountUp);
  startCountUp();

  /* ===== FALLING PETALS ===== */
  if ($('#petalContainer').length) {
    function createPetal() {
      var petal = $('<div class="petal"></div>');
      var left = Math.random() * 100;
      var duration = 4 + Math.random() * 6;
      var delay = Math.random() * 8;
      var size = 6 + Math.random() * 10;
      petal.css({
        left: left + '%',
        width: size + 'px', height: size + 'px',
        animationDuration: duration + 's',
        animationDelay: delay + 's',
        background: Math.random() > 0.5 ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
        borderRadius: Math.random() > 0.5 ? '0 50% 0 50%' : '50% 0 50% 0'
      });
      $('#petalContainer').append(petal);
      setTimeout(function() { petal.remove(); }, (duration + delay) * 1000);
    }
    setInterval(createPetal, 600);
  }

  /* ===== GALLERY FILTER ===== */
  $('.filter-btn').on('click', function () {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    var filter = $(this).data('filter');
    $('.gallery-item').each(function () {
      if (filter === 'all' || $(this).data('cat') === filter) {
        $(this).stop(true).fadeIn(400);
      } else {
        $(this).stop(true).fadeOut(300);
      }
    });
  });

  /* ===== LIGHTBOX ===== */
  $(document).on('click', '.gallery-item', function () {
    var src = $(this).find('img').attr('src');
    $('#lightboxImg').attr('src', src);
    $('#lightbox').addClass('active');
    $('body').css('overflow', 'hidden');
  });
  $('#lightboxClose, #lightbox').on('click', function (e) {
    if (e.target === this) {
      $('#lightbox').removeClass('active');
      $('body').css('overflow', '');
    }
  });

  /* ===== CONTACT FORM ===== */
 $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    
    var form = this;
    
    // Check HTML5 validation
    if (!form.checkValidity()) {
      e.stopPropagation();
      $(form).addClass('was-validated');
      return false;
    }
    
    // Additional custom validations
    var isValid = true;
    var errors = [];
    
    // Validate name
    var name = $('#userName').val().trim();
    var nameRegex = /^[a-zA-Z\s]+$/;
    if (name.length < 3) {
      errors.push('Name must be at least 3 characters long.');
      $('#userName').addClass('is-invalid');
      isValid = false;
    } else if (!nameRegex.test(name)) {
      errors.push('Name can only contain letters and spaces.');
      $('#userName').addClass('is-invalid');
      isValid = false;
    } else {
      $('#userName').removeClass('is-invalid').addClass('is-valid');
    }
    
    // Validate phone
    var phone = $('#userPhone').val().trim();
    var phoneRegex = /^(\+92|0)?[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
      errors.push('Please enter a valid Pakistani phone number.');
      $('#userPhone').addClass('is-invalid');
      isValid = false;
    } else {
      $('#userPhone').removeClass('is-invalid').addClass('is-valid');
    }
    
    // Validate email
    var email = $('#userEmail').val().trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address.');
      $('#userEmail').addClass('is-invalid');
      isValid = false;
    } else {
      $('#userEmail').removeClass('is-invalid').addClass('is-valid');
    }
    
    // Validate wedding date (must be future date)
    var weddingDate = $('#weddingDate').val();
    if (!weddingDate) {
      errors.push('Please select your wedding date.');
      $('#weddingDate').addClass('is-invalid');
      isValid = false;
    } else {
      var selectedDate = new Date(weddingDate);
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.push('Wedding date must be in the future.');
        $('#weddingDate').addClass('is-invalid');
        isValid = false;
      } else {
        $('#weddingDate').removeClass('is-invalid').addClass('is-valid');
      }
    }
    
    // Validate ceremony type
    var ceremonyType = $('#ceremonyType').val();
    if (!ceremonyType) {
      errors.push('Please select a ceremony type.');
      $('#ceremonyType').addClass('is-invalid');
      isValid = false;
    } else {
      $('#ceremonyType').removeClass('is-invalid').addClass('is-valid');
    }
    
    // Validate guest count
    var guestCount = $('#guestCount').val();
    if (!guestCount) {
      errors.push('Please select expected guest count.');
      $('#guestCount').addClass('is-invalid');
      isValid = false;
    } else {
      $('#guestCount').removeClass('is-invalid').addClass('is-valid');
    }
    
    // Validate message
    var message = $('#userMessage').val().trim();
    if (message.length < 20) {
      errors.push('Message must be at least 20 characters long.');
      $('#userMessage').addClass('is-invalid');
      isValid = false;
    } else {
      $('#userMessage').removeClass('is-invalid').addClass('is-valid');
    }
    
    // If validation fails, show errors and stop
    if (!isValid) {
      $(form).addClass('was-validated');
      // Scroll to first error
      var firstError = $('.is-invalid:first');
      if (firstError.length) {
        $('html, body').animate({
          scrollTop: firstError.offset().top - 100
        }, 500);
      }
      return false;
    }
    
    // All validations passed - proceed with form submission
    var $btn = $('#submitBtn');
    $btn.html('<i class="bi bi-hourglass-split me-2"></i> Sending...').prop('disabled', true);
    
    // Simulate sending (replace with actual AJAX call to your backend)
    setTimeout(function () {
      $btn.html('<i class="bi bi-check-circle me-2"></i> Message Sent!')
          .css('background','var(--gold)')
          .css('color','var(--deep)');
      
      // Reset form after 2 seconds
      setTimeout(function() {
        form.reset();
        $(form).removeClass('was-validated');
        $('.is-valid').removeClass('is-valid');
        $btn.html('<i class="bi bi-send me-2"></i> Send Message')
            .prop('disabled', false)
            .css('background','')
            .css('color','');
      }, 2000);
    }, 1800);
  });
  
  // Clear validation on input change
  $('#contactForm input, #contactForm select, #contactForm textarea').on('input change', function() {
    if ($(this).hasClass('is-invalid')) {
      $(this).removeClass('is-invalid');
    }
  });

});
