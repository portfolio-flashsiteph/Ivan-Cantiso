$(document).ready(function () {

  // 1. Sticky Header
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $('#navbar').addClass('sticky');
    } else {
      $('#navbar').removeClass('sticky');
    }
  });

  // 2. Mobile Navigation Toggle
  $('#nav-toggle').on('click', function () {
    $('#nav-menu').toggleClass('active');
  });

  // 3. Smooth Scroll Navigation
  $('.nav-link, .btn, .footer-nav a').on('click', function (e) {
    var href = $(this).attr('href');
    if (href && href.startsWith('#') && href.length > 1) {
      var target = $(href);
      if (target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 80
        }, 600);
        
        $('#nav-menu').removeClass('active');
      }
    }
  });

  // 4. Scroll Reveal Animations & Number Counter Trigger
  var skillsTriggered = false;

  function revealOnScroll() {
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();

    // Reveal elements on scroll
    $('.reveal-left, .reveal-right, .reveal-bottom').each(function () {
      var elementTop = $(this).offset().top;
      if (scrollTop + windowHeight - 100 > elementTop) {
        $(this).addClass('reveal-active');
      }
    });

    // Circular Skill Chart & Counter Trigger
    var skillsElem = $('#skills-section');
    if (skillsElem.length && !skillsTriggered) {
      var skillsTop = skillsElem.offset().top;
      if (scrollTop + windowHeight - 50 > skillsTop) {
        skillsTriggered = true;
        animateSkillCounters();
      }
    }
  }

  // Smooth Counter Animation Function
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

  // Check positions on page load and on scrolling
  $(window).on('scroll resize', revealOnScroll);
  revealOnScroll();

  // 5. Contact Form Handler
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    alert('Thank you for reaching out! Your message has been sent successfully.');
    $(this)[0].reset();
  });

  // 6. Newsletter Form Handler
  $('#newsletterForm').on('submit', function (e) {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    $(this)[0].reset();
  });

});
