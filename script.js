$(document).ready(function () {

  // Dynamic conic-gradient style generator for skill circles
  $('.circle-chart').each(function () {
    var percent = $(this).attr('data-percent');
    $(this).css('--percent', percent);
  });

  // Mobile navigation drawer toggle
  $('#nav-toggle').on('click', function () {
    $('#nav-menu').toggleClass('active');
  });

  // Smooth scroll logic for menu links
  $('.nav-link, .footer-nav a').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 80
      }, 600);
      
      $('#nav-menu').removeClass('active');
    }
  });

  // Highlight navigation options on scroll
  $(window).on('scroll', function () {
    var scrollPos = $(document).scrollTop() + 100;
    
    $('.nav-link').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr('href'));
      
      if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.nav-link').removeClass('active');
        currLink.addClass('active');
      }
    });
  });

  // Form Submission Prevent Default
  $('#newsletterForm').on('submit', function (e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    $(this)[0].reset();
  });

});
