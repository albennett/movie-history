define(["dependencies", "authcall", "create-user-in-private-firebase", "q"], 
  function(_$_, authCall, createUserInPrivateFirebase, Q) {

return {
    findMovie: function(moviedata, userID) {
    	console.log("moviedata", moviedata);
      var thisUserLibrary = new Firebase("https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" + userID);
      var userMovieInLibrary = thisUserLibrary.child(moviedata.Title);
      moviedata.Rating = 0;
      moviedata.Watched = false;
      moviedata.Active = true;

      userMovieInLibrary.set(moviedata);
      }
        
    };
});