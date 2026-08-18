$(document).ready(function () {

  // 1. Sticky Header
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $('#navbar').addClass('sticky');
    } else {
      $('#navbar').removeClass('sticky');
    }
  });

  // 2. Mobile Navigation Toggle & Backdrop Management
  $('#nav-toggle').on('click', function (e) {
    e.stopPropagation();
    $('#nav-menu').toggleClass('active');
    $('body').toggleClass('menu-open');
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('#nav-menu, #nav-toggle').length) {
      $('#nav-menu').removeClass('active');
      $('body').removeClass('menu-open');
    }
  });

  // 3. Smooth Scroll Navigation
  $('.nav-link, .btn, .footer-nav a').on('click', function (e) {
    var href = $(this).attr('href');
    if (href && href.startsWith('#') && href.length > 1) {
      var target = $(href);
      if (target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 70
        }, 600);
        
        $('#nav-menu').removeClass('active');
        $('body').removeClass('menu-open');
      }
    }
  });

  // 4. Scroll Reveal Animations & Skill Counters
  var skillsTriggered = false;

  function revealOnScroll() {
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();

    $('.reveal-left, .reveal-right, .reveal-bottom').each(function () {
      var elementTop = $(this).offset().top;
      if (scrollTop + windowHeight - 80 > elementTop) {
        $(this).addClass('reveal-active');
      }
    });

    var skillsElem = $('#skills-section');
    if (skillsElem.length && !skillsTriggered) {
      var skillsTop = skillsElem.offset().top;
      if (scrollTop + windowHeight - 40 > skillsTop) {
        skillsTriggered = true;
        animateSkillCounters();
      }
    }
  }

  function animateSkillCounters() {
    $('.counter').each(function () {
      var $this = $(this);
      var target = parseInt($this.attr('data-target'));
      var parentChart = $this.closest('.circle-chart');

      $({ countNum: 0 }).animate(
        { countNum: target },
        {
          duration: 2000,
          easing: 'swing',
          step: function (now) {
            var currentVal = Math.floor(now);
            $this.text(currentVal);
            parentChart.css('--percent', currentVal);
          },
          complete: function () {
            $this.text(target);
            parentChart.css('--percent', target);
          }
        }
      );
    });
  }

  $(window).on('scroll resize', revealOnScroll);
  revealOnScroll();

  // 5. Testimonial Slider System
  var slides = $('.testimonial-slide');
  var totalSlides = slides.length;
  var currentIndex = 0;
  var autoSlideInterval = null;

  function initSliderDots() {
    var dotsContainer = $('#sliderDots');
    dotsContainer.empty();
    slides.each(function (i) {
      dotsContainer.append('<div class="dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></div>');
    });
  }

  function showSlide(index) {
    if (index >= totalSlides) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = totalSlides - 1;
    } else {
      currentIndex = index;
    }

    slides.removeClass('active').hide();
    slides.eq(currentIndex).addClass('active').fadeIn(400);

    $('.dot').removeClass('active');
    $('.dot').eq(currentIndex).addClass('active');
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(function () {
      showSlide(currentIndex + 1);
    }, 5000);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }

  // Bind Slider Events
  if (totalSlides > 0) {
    initSliderDots();
    showSlide(0);
    startAutoSlide();

    $('#nextSlide').off('click').on('click', function () {
      showSlide(currentIndex + 1);
      startAutoSlide();
    });

    $('#prevSlide').off('click').on('click', function () {
      showSlide(currentIndex - 1);
      startAutoSlide();
    });

    $(document).off('click', '.dot').on('click', '.dot', function () {
      var idx = parseInt($(this).attr('data-index'));
      showSlide(idx);
      startAutoSlide();
    });
  }

  // 6. Portfolio Image Lightbox Modal
  $('.lightbox-trigger').on('click', function () {
    var fullImgSrc = $(this).attr('data-img');
    var imgTitle = $(this).attr('data-title');

    $('#lightboxImage').attr('src', fullImgSrc);
    $('#lightboxCaption').text(imgTitle);
    $('#lightboxModal').fadeIn(300);
  });

  $('#lightboxClose, #lightboxModal').on('click', function (e) {
    if (e.target !== $('#lightboxImage')[0]) {
      $('#lightboxModal').fadeOut(300);
    }
  });

  // 7. Form Handlers
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    alert('Thank you for reaching out, Ivan will get back to you shortly!');
    $(this)[0].reset();
  });

  $('#newsletterForm').on('submit', function (e) {
    e.preventDefault();
    alert('Thank you for subscribing to Ivan Cantiso\'s content strategy briefing!');
    $(this)[0].reset();
  });

});
