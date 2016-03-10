$( document ).ready(function() {

 /* $('.home #secondary-nav-container').affix({
    offset: {
      top: $('#secondary-nav').offset().top + 0,
      bottom: function () {
      }
    }
  });
*/
  $( ".secondary-nav-toggle" ).on( "click", function(e) {
    e.preventDefault();
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    
    // get drawer toggle 
    $drawer_toggle_arrow = $('.drawer-indicator');

    toggle_caret($drawer_toggle_arrow);
    
    $drawer_nav = $('#nav-drawer');
    $drawer_nav.slideToggle();
  });

  /*
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
   
   */
  
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
                  }).addClass('affix-top');
                  if(nextElement) {
                    nextElement.css({
                        position: "static",
                    });
                  }
                  $('body').css({
                      "padding-top": elementHeight
                  });
              }

          }
          else{
              $(this).css({
                  position: "static"
              }).removeClass('affix-top');
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
  $('.dropdown').on('show.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
  });

  // ADD SLIDEUP ANIMATION TO DROPDOWN //
  $('.dropdown').on('hide.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
  });
});

toggle_caret = function(el) {
  $caret = el;
  $caret.toggleClass('nav-caret-down').toggleClass('nav-caret-up');
}