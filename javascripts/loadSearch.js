define(["dependencies", "stars", "grabmovies"], 
  function(_$_, stars, grabmovies) {
    var allResults = {};
    var authInfo;


    function populateMovies(passedAuth) { 
      authInfo = passedAuth;
      var title = $("#titleInput").val();
      $.ajax({ //grabs omdb api with title value
          url: "http://www.omdbapi.com/?s=" + title
        }).done(function(movieData) {

          allResults = movieData.Search; // Creates ann array of all search results
          var postersForTemplate = {}; // Prepares object to send to hbs template
          console.log("postersForTemplate", postersForTemplate);

          // Cycles thru and changes poster so we have permission to print to page
          for (var i = 0; i < allResults.length; i++) {
            allResults[i].Poster = "http://img.omdbapi.com/?i=" + allResults[i].imdbID + "&apikey=8513e0a1";
          }

          postersForTemplate = {"posterListings": allResults}; 

          // Sends array, modified with proper poster w/ api key, to template
          require(['hbs!../templates/each_movie'], function(getMovieTemplate){
            $('#results').html(getMovieTemplate(postersForTemplate));
            $(".rating").rating();
          });

          $("#titleInput").val(""); //leaves input empty

        });
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

    return {
      clickToAdd: clickToAdd,
      populateMovies: populateMovies,
    };
});