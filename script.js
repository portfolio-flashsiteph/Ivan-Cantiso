$(document).ready(function () {

  // 1. Sticky Header
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $('#navbar').addClass('sticky');
    } else {
      $('#navbar').removeClass('sticky');
    }
  });

  // 2. Mobile Menu Toggle
  $('#nav-toggle').on('click', function () {
    $('#nav-menu').toggleClass('active');
  });

  // 3. Smooth Scroll
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

  // 4. Scroll Reveal Animations & Animated Counters Trigger
  var skillsTriggered = false;

  function revealOnScroll() {
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();

    // Scroll Animations Trigger
    $('.reveal-left, .reveal-right, .reveal-bottom').each(function () {
      var elementTop = $(this).offset().top;
      if (scrollTop + windowHeight - 100 > elementTop) {
        $(this).addClass('reveal-active');
      }
    });

    // Circular Chart Counter Trigger
    var skillsElem = $('#skills-section');
    if (skillsElem.length && !skillsTriggered) {
      var skillsTop = skillsElem.offset().top;
      if (scrollTop + windowHeight - 50 > skillsTop) {
        skillsTriggered = true;
        animateSkillCounters();
      }
    }
  }

  // Counter & Skill Circle Dynamic Animation Function
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
          step: function () {
            var currentVal = Math.floor(this.countNum);
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

  // Initial trigger check on page load and window scroll
  $(window).on('scroll resize', revealOnScroll);
  revealOnScroll();

  // 5. Prevent Newsletter Submit Default Behavior
  $('#newsletterForm').on('submit', function (e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    $(this)[0].reset();
  });

});
