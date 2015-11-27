define(["dependencies", "stars", "grabmovies", "q"], 
  function(_$_, stars, grabmovies, Q) {
    var allResults = {};
    var authInfo;


    function populateMovies(passedAuth, userSearchInput) { 

      var deferred = Q.defer();

      console.log("populateMovies triggered", userSearchInput);
      authInfo = passedAuth;
      $.ajax({ //grabs omdb api with userSearchInput value
          url: "http://www.omdbapi.com/?s=" + userSearchInput
        }).done(function(movieData) {

          allResults = movieData.Search; // Creates ann array of all search results
          var postersForTemplate = {}; // Prepares object to send to hbs template

          // Cycles thru and changes poster so we have permission to print to page
          for (var i = 0; i < allResults.length; i++) {
            allResults[i].Poster = "http://img.omdbapi.com/?i=" + allResults[i].imdbID + "&apikey=8513e0a1";
          }

          postersForTemplate = {"posterListings": allResults}; 
          console.log("postersForTemplate", postersForTemplate);

          deferred.resolve(postersForTemplate); // where promise delivers resolve, send posters object
        })
        .fail(function(error) {
          console.log("error", error);
          defer.reject(error);
        });

        return deferred.promise;
    }

        // Adds data from just this particular movie to user's library of movies, not yet functioning
    function clickToAdd(e) {
      var thisMovieId = e.target.id; // grabs movie in search results from id on add button
      console.log("e", e);
      var thisMovieImdbId = allResults[thisMovieId].imdbID; // grabs proper movie information given correct id
      console.log("thisMovieId after add", thisMovieId);
      console.log("thisMovieImdbId after add", thisMovieImdbId);
      $.ajax({ // Makes the next api request to get full listing on movie, not just search results (which were abbreviated)
        url: "http://www.omdbapi.com/?i=" + thisMovieImdbId + "&r=json"
      }).done(function(fullMovieListing) {
        fullMovieListing.Poster = "http://img.omdbapi.com/?i=" + thisMovieImdbId + "&apikey=8513e0a1";
        console.log("fullMovieListing", fullMovieListing);
        // Sends full movie listing, with user login ID, to store on website database
        grabmovies.findMovie(fullMovieListing, authInfo);

      });
    }

    function addSearchModal(e) {
      console.log("e", e);
      var thisMovieId = e.target.id;
      console.log("thismovieid", thisMovieId);
      var thisMovieImdbId = allResults[thisMovieId].imdbID; // grabs proper movie information given correct id
      console.log("thisMovieId after add", thisMovieId);
      console.log("thisMovieImdbId after add", thisMovieImdbId);
      $.ajax({ // Makes the next api request to get full listing on movie, not just search results (which were abbreviated)
        url: "http://www.omdbapi.com/?i=" + thisMovieImdbId + "&r=json"
      }).done(function(fullMovieListing) {
        console.log("fullMovieListing", fullMovieListing);
          require(['hbs!../templates/modal'], function(modalTemplate) {
          console.log("modalTemplate", modalTemplate);
            $("#modal-body").html(modalTemplate(fullMovieListing));
          });
        $(".modal-title").html(fullMovieListing.Title);
        $('#posterModal').modal();
       });
    }

    return {
      clickToAdd: clickToAdd,
      populateMovies: populateMovies,
      addSearchModal: addSearchModal
    };
});