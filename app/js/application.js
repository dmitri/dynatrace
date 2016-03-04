$( document ).ready(function() {

  $('.home #secondary-nav-container').affix({
    offset: {
      top: $('#secondary-nav').offset().top,
      bottom: function () {
      }
    }
  });
  
  $('.secondary-tech #secondary-nav-container').affix({
    offset: {
      top: $('#secondary-nav').offset().top,
      bottom: function () {
      }
    }
  });

  $( ".secondary-nav-toggle" ).on( "click", function(e) {
    e.preventDefault();
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    
    // get drawer toggle 
    $drawer_toggle_arrow = $('.drawer-indicator');

    toggle_caret($drawer_toggle_arrow);
    
    $drawer_nav = $('#nav-drawer');
    $drawer_nav.slideToggle();
  });
  
  $('[data-toggle=collapse]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
  
  
  // add and remove the padding when the nav affixes
  
  $(".home #secondary-nav-container").on('affix.bs.affix', function(){
    //$('#masthead.navbar-fixed-top').addClass('push-it');
    $('#slot-2').addClass('add-pad');
    $('#secondary-nav-brand img').addClass('sticky-logo');
  });
  
  $(".home #secondary-nav-container").on('affix-top.bs.affix', function(){
    //$('#masthead.navbar-fixed-top').removeClass3('push-it');
    $('#slot-2').removeClass('add-pad');
    $('#secondary-nav-brand img').removeClass('sticky-logo');
  });
  
  $(".secondary-tech #secondary-nav-container").on('affix.bs.affix', function(){
    $('#hero').addClass('add-pad');
    $('#secondary-nav-brand img').addClass('sticky-logo');
  });
  
  $(".secondary-tech #secondary-nav-container").on('affix-top.bs.affix', function(){
    $('#hero').removeClass('add-pad');
    $('#secondary-nav-brand img').removeClass('sticky-logo');
  });
  
  
  $( ".tertiary-tech-toggle" ).on( "click", function(e) {
    toggle_caret(this);
  });
    
  
  //$("#masthead").sticky({ topSpacing: 0, className:"prime-fixed" });
  //$("#secondary-nav").sticky({ topSpacing: 0, center:true, className:"secondary-fixed" });
  //$("#tertiary-nav-container").sticky({ topSpacing:65, center:true, className:"tertiary-fixed" });
  

  $('#off-canvas-nav').scotchPanel({

      beforePanelOpen: function() {
          //alert('Before Panel Opened');
      },
      afterPanelOpen: function() {
          //alert('After Panel Opened');
      },
      beforePanelClose: function() {
          //alert('Before Panel Closed');
      },
      afterPanelClose: function() {
          //alert('After Panel Opened');
      },

      containerSelector: 'body',
      direction: 'right',
      clickSelector: '.toggle-panel'
  });


});

toggle_caret = function(el) {
  $caret = el;
  $caret.toggleClass('nav-caret-down').toggleClass('nav-caret-up');
}