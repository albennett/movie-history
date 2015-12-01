define(function(require) {
  var _$_ = require("dependencies");
  var Q = require("q");

  function deleteMovie(movieKey, userAuth) {

    var inactive = {
      "Active": false 
    };

    $.ajax({
      url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_"+userAuth+"/" + movieKey + "/.json",
      method: "PATCH",
      data: JSON.stringify(inactive)
    })
    .done(function(info) {
      console.log("AJAX Watched patch", info);
    });

  } // close deleteMovie

  return deleteMovie; //return statement for the file

});