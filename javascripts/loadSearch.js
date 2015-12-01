define(["dependencies", "stars", "grabmovies", "q"], 
  function(_$_, stars, grabmovies, Q) {
    var allResults = {};
    var authInfo;

  
    function populateMovies(passedAuth, userSearchInput) { 

      var deferred = Q.defer();

      authInfo = passedAuth;
      $.ajax({ //grabs omdb api with userSearchInput value
          url: "http://www.omdbapi.com/?s=" + userSearchInput
        }).done(function(movieData) {
          console.log("AJAX call searching", movieData);
          deferred.resolve(movieData); // where promise delivers resolve, send movieData object
        })
        .fail(function(error) {
          console.log("error", error);
          defer.reject(error);
        });

        return deferred.promise;
    }

    // Adds data from just this particular movie to user's library of movies, not yet functioning
    function clickToAdd(e) {
      var thisMovieImdbId = e.target.id; // grabs movie in search results from id on add button
      // var thisMovieImdbId = allResults[thisMovieId].imdbID; // grabs proper movie information given correct id
      $.ajax({ // Makes the next api request to get full listing on movie, not just search results (which were abbreviated)
        url: "http://www.omdbapi.com/?i=" + thisMovieImdbId + "&r=json"
      }).done(function(fullMovieListing) {

        // Need If Then Poster
        if (fullMovieListing.Poster !== "N/A") {
          fullMovieListing.Poster = "http://img.omdbapi.com/?i=" + thisMovieImdbId + "&apikey=8513e0a1";
        }
        
        // Sends full movie listing, with user login ID, to store on website database
        grabmovies.findMovie(fullMovieListing, authInfo);

      });
    }

    return {
      clickToAdd: clickToAdd,
      populateMovies: populateMovies
    };
});