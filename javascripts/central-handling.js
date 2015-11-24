define(["dependencies", "authcall", "return-users", "create-user-in-private-firebase", "q", "loadSearch", "user-library", "delete-movie", "movie-change", "user-sign-up", "login", "searchmymovies"], 
  function(_$_, authCall, returnusers, createUserInPrivateFirebase, Q, loadSearch, usersLibrary, deleteMovie, movieChange, userSignUp, loginUniqueUser, searchMyMovies) {
    
    $(".page").hide(); // on page load, everything is hidden

    $("#entry-screen").show();

    var auth;
    var myFirebaseRef = new Firebase("https://ama-moviehistory.firebaseio.com/");

    myFirebaseRef.child("users").on("value", function(snapshot) {
      // usersLibrary.getLibrary(auth);
    });

    var email, password;
    var signup = false;

    function changePageOnAuth () {
      $(".main-page").show();
      $("#entry-screen").hide();
      $('#password').val("");
      console.log("you've changed pages");
    }



    $('#signupButton').on("click", function() {
      email = $('#email').val();
      password = $('#password').val();

      createUserInPrivateFirebase(email, password, myFirebaseRef)
        .then(function(authConfirmNumber) {
          auth = authConfirmNumber.uid;
          console.log("authConfirm", auth);
          changePageOnAuth();
        })
        .fail(function(error) {
          console.log(error);
        });

    });// Closes sign up button click


    //Start logout function
    $("#logout-button").click(function(e) {
      console.log("You have clicked the logout button!", auth);
      if (auth) {
        auth = null;
        myFirebaseRef.unauth();
        console.log("what's going on", auth);

        $("#results").html("");
        $(".page").hide(); // potentially change in future
        $("#entry-screen").show();
      }

    }); //END LOGOUT FUNCTION

    // User authentication, private process w/ Firebase
    $('#login').on("click", function() {
      email = $('#email').val();
      password = $('#password').val();
      authCall(email, password, myFirebaseRef) 
        // Send email and password for login authentication
        .then(function(authData) {
          auth = authData.uid;

          changePageOnAuth(); // keep thus far

          loginUniqueUser(myFirebaseRef, auth, email, password); // checks user against existing ones
        })
        .fail(function(error) {
          console.log("error", error);
        });
    }); //END LOGIN FUNCTION





    //////// BELOW HERE, FUNCTIONALITY WILL CHANGE ///////

  $("#modal-search-btn").on("click", function(){
    loadSearch.populateMovies(auth);
  });

  $("#search-my-movie-library").on("click", function(){
    searchMyMovies(auth); // potentially need userlibrary and title collected on click

  }); // closes click function

  $(document).on("click", ".movie-add", function(e){
    console.log("You clicked the add button");
    loadSearch.clickToAdd(e);
  });

  $(document).on("click", ".delete-button", function(e){
    console.log("You clicked the delete button");
    var movieKey = e.target.getAttribute('key');
    deleteMovie(movieKey, auth)
    .then(function(){
      usersLibrary.getLibrary(auth);
    });
  });

  $(document).on("click", ".movie-watch", function(e){
    console.log("You clicked the watch button");
    var movieKey = e.target.getAttribute('key');
    movieChange.watchMovie(movieKey, auth)
    .then(function(){
      usersLibrary.getLibrary(auth);
    });
  });

  $(document).on('rating.change', function(event, starValue) {
    console.log(starValue);
    var starKey = event.target.id;
    console.log("starKey", starKey);
    movieChange.rateMovie(starKey, auth, starValue)
    .then(function(){
      usersLibrary.getLibrary(auth);
    });
  });


  $(document).on("click", ".clickAll", function(e){
    console.log("You clicked the All button at top");
    $("div[watchtoggle='true']").show();
    $("div[watchtoggle='false']").show();
  });

  $(document).on("click", ".clickWatch", function(e){
    console.log("You clicked the WATCHED button at top");
    $("div[watchtoggle='true']").show();
    $("div[watchtoggle='false']").hide();
  });

  $(document).on("click", ".clickUnwatch", function(e){
    console.log("You clicked the UNWATCHED button at top");
    $("div[watchtoggle='true']").hide();
    $("div[watchtoggle='false']").show();
  });

  $(document).on("click", ".clickFave", function(e){
    console.log("You clicked the Fave button at top");
    $("div[watchtoggle='true']").hide();
    $("div[watchtoggle='false']").hide();
    $("div[fave='5']").show();
  });

  $("#search-my-movie-library").on("click", function(){
    $("#watch-unwatch").removeClass('test');
  });
});// END REQUIRE FUCTION
