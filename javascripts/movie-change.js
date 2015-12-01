define(function(require) {
  var _$_ = require("dependencies");
  var Q = require("q");

  function rateMovie(movieKey, userAuth, stars) {

    var newRating = {
      "Rating": stars
    };

    $.ajax({
      url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_"+userAuth+"/" + movieKey + "/.json",
      method: "PATCH",
      data: JSON.stringify(newRating)
    })
    .done(function(info) {
      console.log("AJAX newRating patch", info);
    });

  }

  function watchMovie(movieKey, userAuth) {

    var watch = {
      "Watched": true 
    };

    $.ajax({
		  url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_"+userAuth+"/" + movieKey + "/.json",
		  method: "PATCH",
      data: JSON.stringify(watch)
		})
    .done(function(info) {
      console.log("AJAX Watched patch", info);
    });

  }

  return {
    watchMovie: watchMovie,
    rateMovie: rateMovie
  }; //return statement for the file

});