/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Scripts = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages

        console.log("Hello!");

        // Toggle Navigation
        function toggleNavBar() {
          $('.menu-nav').slideToggle(400);
        }
        $('#menu-toggle').click( toggleNavBar );

        // Form Select
        $("select").each(function() {
          $(this).wrapAll("<div class='select-wrapper'></div>");
        });
        // Responsive Tables
        $('table').addClass('table');

        $(".table").each(function(){
            $(this).wrapAll("<div class='table-wrapper'></div>");
        });

        // Docks nav to top when scrolling
        var sticky_navigation_offset_top = $('.banner').offset().top;

        var sticky_navigation = function() {
          $('body').toggleClass('traveling', $(window).scrollTop() > 0);
        };

        $(window).scroll( sticky_navigation );
        sticky_navigation();
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // Section page, note the change from about-us to about_us.
    'section_one': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    },
    // Section page, note the change from about-us to about_us.
    'section_two': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Scripts;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.