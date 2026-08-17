$(document).ready(function () {

  // Sticky Navbar implementation
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $('#navbar').addClass('sticky');
    } else {
      $('#navbar').removeClass('sticky');
    }
  });

  // Mobile Menu Toggle
  $('#nav-toggle').on('click', function () {
    $('#nav-menu').toggleClass('active');
  });

  // Smooth Scroll and Navigation Link Activation
  $('.nav-link').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 70
      }, 600);
      
      // Close mobile navigation on click
      $('#nav-menu').removeClass('active');
    }
  });

  // Highlight Active Link on Scroll
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

  // Prevent default newsletter submit action
  $('#newsletterForm').on('submit', function (e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    $(this)[0].reset();
  });

});