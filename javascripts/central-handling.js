define(["dependencies", "authcall", "return-users", "create-user-in-private-firebase", "q", "loadSearch", "user-library", "delete-movie", "movie-change", "user-sign-up", "login", "searchmymovies", "add-modal", "hbs!../templates/each_my_movies"], 
  function(_$_, authCall, returnusers, createUserInPrivateFirebase, Q, loadSearch, usersLibrary, deleteMovie, movieChange, userSignUp, loginUniqueUser, searchMyMovies, addModal, eachMyMoviesTemplate) {
    
    $(".page").hide(); // on page load, everything is hidden

    $("#entry-screen").show();

    var auth;
    var myFirebaseRef = new Firebase("https://ama-moviehistory.firebaseio.com/");

    myFirebaseRef.child("users").on("value", function(snapshot) {
      // usersLibrary(auth);
    });

    var email, password;
    var signup = false;

    function changePageOnAuth () {
      $(".main-page").show();
      $("#entry-screen").hide();
      $('#password').val("");
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
          return usersLibrary(auth);
        })
        // Puts results to DOM, according to which user loads
        .then(function(allUserMovies) {
          $("#results").html(eachMyMoviesTemplate(allUserMovies));
        })
        .fail(function(error) {
          console.log("error", error);
        }); // closes authCall promise

    }); //END LOGIN FUNCTION

    // when you click on a poster, addModal file gets called and modal appears with movie info.
    $('body').on('click', '.poster', function(event) {
      var movieKey = event.target.getAttribute('key'); 
      addModal(auth, movieKey);
      loadSearch.addSearchModal(event);
    });

    // Search bar functionality
    var userSearchField = $(".search-all-movies");
    userSearchField.keyup(function(e) {
      if (e.keyCode === 13) {
        var userSearchValue = userSearchField.val(); // gathers user input in search

        // If search bar is empty, loads user's movie catalog
        if (userSearchValue === "") {
          console.log("should not have triggered serachMyMovies");
          usersLibrary(auth)
            .then(function(allUserMovies) {
              $("#results").html(eachMyMoviesTemplate(allUserMovies));
            })
            .fail(function(error) {
              console.log("error", error);
            });
        } 

        // If user entered value into search bar
        else {  
          userSearchField.val("");
          console.log("userInput", userSearchValue);
          // loadSearch.populateMovies(auth, userSearchValue);
          searchMyMovies(auth, userSearchValue);
        }





      }
    });


});// Close page

    //////// BELOW HERE, FUNCTIONALITY WILL CHANGE ///////
 
//   $("#search-my-movie-library").on("click", function(){
//     searchMyMovies(auth); // potentially need userlibrary and title collected on click

//   }); // closes click function of search my movies

//   $(document).on("click", ".movie-add", function(e){
//     console.log("You clicked the add button");
//     loadSearch.clickToAdd(e);
//   });

//   $(document).on("click", ".delete-button", function(e){
//     console.log("You clicked the delete button");
//     var movieKey = e.target.getAttribute('key');
//     deleteMovie(movieKey, auth)
//     .then(function(){
//       usersLibrary(auth);
//     });
//   });

//   $(document).on("click", ".movie-watch", function(e){
//     console.log("You clicked the watch button");
//     var movieKey = e.target.getAttribute('key');
//     movieChange.watchMovie(movieKey, auth)
//     .then(function(){
//       usersLibrary(auth);
//     });
//   });

//   $(document).on('rating.change', function(event, starValue) {
//     console.log(starValue);
//     var starKey = event.target.id;
//     console.log("starKey", starKey);
//     movieChange.rateMovie(starKey, auth, starValue)
//     .then(function(){
//       usersLibrary(auth);
//     });
//   });


//   $(document).on("click", ".clickAll", function(e){
//     console.log("You clicked the All button at top");
//     $("div[watchtoggle='true']").show();
//     $("div[watchtoggle='false']").show();
//   });

//   $(document).on("click", ".clickWatch", function(e){
//     console.log("You clicked the WATCHED button at top");
//     $("div[watchtoggle='true']").show();
//     $("div[watchtoggle='false']").hide();
//   });

//   $(document).on("click", ".clickUnwatch", function(e){
//     console.log("You clicked the UNWATCHED button at top");
//     $("div[watchtoggle='true']").hide();
//     $("div[watchtoggle='false']").show();
//   });

//   $(document).on("click", ".clickFave", function(e){
//     console.log("You clicked the Fave button at top");
//     $("div[watchtoggle='true']").hide();
//     $("div[watchtoggle='false']").hide();
//     $("div[fave='5']").show();
//   });

