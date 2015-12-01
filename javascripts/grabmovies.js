define(["dependencies", "authcall", "create-user-in-private-firebase", "q"], 
  function(_$_, authCall, createUserInPrivateFirebase, Q) {

function processActors (actorString) {

  var actorArray = actorString.split(", ");
  console.log("actorArray", actorArray);

  return actorArray;
}






return {
    findMovie: function(moviedata, userID) {
    	console.log("moviedata before", moviedata);
      var thisUserLibrary = new Firebase("https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" + userID);
      var userMovieInLibrary = thisUserLibrary.child(moviedata.Title);



      // Takes in string of actors, sends to function, and creates a new key with the array of those actors.
      moviedata.Linked_Actors = processActors(moviedata.Actors);

      // Sets beginning movie states, w/ which user interacts.
      moviedata.Rating = 0;
      moviedata.Watched = false;
      moviedata.Active = true;

      console.log("moviedata after", moviedata);

      userMovieInLibrary.set(moviedata);
    }
        
    };
});