$( document ).ready(function() {

  $( "#primary-nav li a" ).on( "click", function(e) {
    e.preventDefault();
    $('html,body').animate({ scrollTop: 0 }, 'fast');


    // get the nav drawer
    $nav_drawer = $('#nav-drawer'); // get the nav drawer
    $sub_nav = $('.subnav-block')    // get all the subnav blocks
    
    
    // check if it's open, if not open it
    if(!$($nav_drawer).hasClass('open')) {
      drawer_toggle($nav_drawer);
    }
    
    alert($("#primary-nav li a").index(this));
    
    // clear the subnav 
    //$sub_nav.hide();

    // get and assign the bottom of the drawer toggle
    $caret = $(this).find('span');
    toggle_caret($caret);
    
  });

  
  /* set up the scrolltracking for animations */
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
  
  /* set up the sticky headers */
  var topOffset = new Array();

  function scrollFunction(){
      var scrollHeight = $(window).scrollTop();
      var headerCounter = 0;
      var scrolled      = 0;
      var headerItems   = $('.header').length;

      $('.header').each(function(index, el){

          var elementHeight = $(this).outerHeight();

          var nextElementHeight = 0;
          var nextElement;

          if(index !== $('.header').length - 1){
              nextElementHeight = $('.header').eq(index + 1).outerHeight();
              nextElement       = $('.header').eq(index + 1);
          }

          if(scrollHeight >= topOffset[headerCounter]
              && (scrollHeight < topOffset[headerCounter + 1] || headerCounter == headerItems-1)){

              scrolled = 1;

              if(scrollHeight >= topOffset[headerCounter + 1] - elementHeight){
                  $(this).css({
                      position: "fixed",
                      top: - (scrollHeight - (topOffset[headerCounter + 1] - elementHeight))
                  });
                  nextElement.css({
                      position: "fixed",
                      top: topOffset[headerCounter + 1] - scrollHeight
                  });
                  $('body').css({
                      "padding-top": elementHeight + nextElementHeight
                  });
                  return false;
              }
              else{
                  $(this).css({
                      position: "fixed",
                      top: 0
                  }).removeClass('affix-top').addClass('affix');
                  if(nextElement) {
                    nextElement.addClass('affix-top');
                  }
                  $('body').css({
                      "padding-top": elementHeight
                  });
              }

          }
          else{
              $(this).addClass('affix-top').removeClass('affix').css('position', '').css('top', '0');
          }

          headerCounter++;
      });

      if(scrolled == 0){
          $('body').css({
              "padding-top": 0
          });
      }
  }

  $(function(){
      $('.header').each(function(){
          topOffset.push($(this).offset().top);
      });
  });

  $(window).scroll(scrollFunction);
  
   // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
  $('#masthead .dropdown').on('show.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
  });

  // ADD SLIDEUP ANIMATION TO DROPDOWN //
  $('#masthead .dropdown').on('hide.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).hide();
  });
  
  // off canvas close button
  $('.offcanvas-close').on('click', function(e){
    close_off_canvas();
  });
});

drawer_toggle = function($drawer) {
  $drawer.slideToggle('fast', function() { 
    $drawer.toggleClass('open');
  });
}

toggle_caret = function(el) {
  $caret = $(el);
  $caret.toggleClass('nav-caret-down').toggleClass('nav-caret-up');
}

close_off_canvas = function() {
  $('#masthead .navbar-toggle').click();
}