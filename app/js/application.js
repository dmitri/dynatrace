$( document ).ready(function() {
  
  // sticky header set up
  (function() {
    var reset_scroll;

    // set the sticky headers and behavior when 
    // stuck and unstuck of the secondary
    return $(".sticky-header, .secondary").stick_in_parent({
      parent: ".sticky-parent"
    }).on("sticky_kit:stick", function(e) {
      if($('#secondary-nav-container').hasClass('is_stuck')) {
        $('#secondary-nav-brand img').addClass('sticky-logo');
      }
    })
    .on("sticky_kit:unstick", function(e) {
        $('#secondary-nav-brand img').removeClass('sticky-logo');
    });

    reset_scroll = function() {
      var scroller;
      scroller = $("body,html");
      scroller.stop(true);
      if ($(window).scrollTop() !== 0) {
        scroller.animate({
          scrollTop: 0
        }, "fast");
      }
      return scroller;
    };

    window.scroll_it = function() {
      var max;
      max = $(document).height() - $(window).height();
      return reset_scroll().animate({
        scrollTop: max
      }, max * 3).delay(100).animate({
        scrollTop: 0
      }, max * 3);
    };

    window.scroll_it_wobble = function() {
      var max, third;
      max = $(document).height() - $(window).height();
      third = Math.floor(max / 3);
      return reset_scroll().animate({
        scrollTop: third * 2
      }, max * 3).delay(100).animate({
        scrollTop: third
      }, max * 3).delay(100).animate({
        scrollTop: max
      }, max * 3).delay(100).animate({
        scrollTop: 0
      }, max * 3);
    };

    $(window).on("resize", (function(_this) {
      return function(e) {
        return $(document.body).trigger("sticky_kit:recalc");
      };
    })(this));

  }).call(this);
  
  // nav drawer setup
  $nav_set = $('#primary-nav li a'); // get the nav
  $nav_drawer = $('#nav-drawer'); // get the nav drawer
  $sub_nav = $('.subnav-block')    // get all the subnav blocks in the drawer

  // nav functions
  $( "#primary-nav li a" ).on( "click", function(e) {
    e.preventDefault();

    // if user has scrolled deep in to the page, get back to the top
    $('html,body').animate({ scrollTop: 0 }, 'fast');

    // remove all active classes
    $($nav_set).removeClass('active');
    
    // set up which subnav is desired so the container will respect the height
    // get the index of the selected nav 
    $selected_index = ($($nav_set).index(this));
    
    // remove active class from submenus
    $sub_nav.removeClass('active');
    // show the subnav with the same index and add the active class
    $selected_subnav = $sub_nav.get($selected_index);
    $selected_subnav_height = $($selected_subnav).height() + 75;

    // if user is clicking a nav link already open and set, close it
    if($(this).find('span').hasClass('nav-caret-up')) {
      drawer_toggle($nav_drawer);   // close the drawer
      reset_nav();                  // reset the nav states
    } else {
      // reset the uninvolved carets
      $($nav_set).each(function(){
        if(!$(this).hasClass('active')) {
          $(this).find('span').removeClass('nav-caret-up').addClass('nav-caret-down');
        }
      });

      $(this).addClass('active'); // add active class to clicked anchor
      
      if($($nav_drawer).hasClass('open')) {
        $($selected_subnav).addClass('active');
        $nav_drawer.animate({
            height: $selected_subnav_height
          }, 250, function() {
        });
      } else {
        $($selected_subnav).addClass('active');
      }
      // all set up - if drawer is not open, open it
      if(!$($nav_drawer).hasClass('open')) {
        drawer_toggle($nav_drawer);
      }
      toggle_caret(this);
    };
  });

  
  /* set up the scrolltracking for animate.css animations */
  var wow = new WOW(
    {
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
      callback:     function(box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null // optional scroll container selector, otherwise use window
    }
  );
  wow.init();


   // add slidedown animation to Bootstrap dropdown //
  $('.dropdown').on('show.bs.dropdown', function(e){
    $(this).find(".nav-caret-down").removeClass('nav-caret-down').addClass('nav-caret-up');
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
  });

  // add slideup animation to Bootstrap dropdown //
  $('.dropdown').on('hide.bs.dropdown', function(e){
    $(this).find(".nav-caret-up").removeClass('nav-caret-up').addClass('nav-caret-down');
    $(this).find('.dropdown-menu').first().stop(true, true).hide();
  });
  
  // off canvas close button
  $('.offcanvas-close').on('click', function(e){
    close_off_canvas();
  });
  
  $('.close-drawer a').on('click', function(e){
    e.preventDefault();
    close_drawer();
  });
  
  // toggle secondary nav carets
  $('#secondary-nav li.dropdown a').on('click', function(e){
    toggle_caret(this);
  });

  // hide the off canvas menu if wider than 768px
  var hide_off_canvas_for_wide;
  function testWinSize(){
    hide_off_canvas_for_wide = $(window).width() > 768; // BOOLEAN

    if(hide_off_canvas_for_wide){
      if($('.offcanvas').hasClass('canvas-slid')) {
        $('#masthead .navbar-toggle').click();
      }
    }
  }

  // check on load and resize if the offcanvas menu is behaving
  $(window).on("load resize", testWinSize);

});


// open close the secondary nav drawer
drawer_toggle = function($drawer) {
  $drawer.slideToggle('fast', function() { 
    $drawer.toggleClass('open');
  });
}

// explicit close of secondary nav drawer
close_drawer = function() {
  $drawer = $('#nav-drawer');
  $drawer.slideUp().toggleClass('open');
  reset_nav();
}

// function to toggle the carets!
toggle_caret = function($el) {
  $caret = $($el).find('span');
  $caret.toggleClass('nav-caret-down').toggleClass('nav-caret-up');
}

// function to reset the primary nav carets
reset_nav = function() {
  $nav_set = $("#primary-nav li a");
  $nav_set.removeClass('active');
  $nav_set.find('span.nav-caret-up').removeClass('nav-caret-up').addClass('nav-caret-down');
}

// explicit close of offcanvas menu
close_off_canvas = function() {
  $('#masthead .navbar-toggle').click();
}