require.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'q': '../lib/bower_components/q/q',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../lib/bower_components/firebase/firebase',
    'stars': '../lib/bower_components/bootstrap-star-rating/js/star-rating.min',
    'slider': '../lib/bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'stars': ['bootstrap'],
    'slider' : ['bootstrap']
  }
});

require(
["dependencies", "central-handling", "q", "stars", "slider"], 
function(_$_, centralHandling, Q, stars, slider) {


$("#ex6").slider();
$("#ex6").on("slide", function(slideEvt) {
  $("#ex6SliderVal").text(slideEvt.value);

    if (slideEvt.value === 0) {
      $("div[watchtoggle='true']").show();
      $("div[watchtoggle='false']").show();
      $("#all-user-title").show();
      $(".search-result").parent().show();
      $("div[active='false']").hide();


    } else {
      $("div[watchtoggle='true']").hide();
      $("div[watchtoggle='false']").hide();
      $(".search-result").parent().hide();
      $("#all-user-title").hide();
      $("div[fave='"+slideEvt.value+"']").show();
      $("div[active='false']").hide();


    }

});


});