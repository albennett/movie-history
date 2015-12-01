# Movie History

Movie History is created by Amy Lee Bennett, Mathew Ostrander, and Andri Alexandrou.

## Requirements
1. Must have the ability to register a user in Firebase
1. Must have the ability to log in
1. You must use Firebase to store movies
1. You must be able to add movies
1. You must be able to remove movies
1. Each movie must have the following properties
   1. Movie name
   1. Year released
   1. An array of major actors
   1. An integer rating of 1-5
   1. A boolean value that, if true, means that you have Watched the movie
1. You must be using Grunt to automate Javascript testing
1. You must be using Grunt to automate SASS compilation

## Progress

*Please view [our Trello board](https://trello.com/b/APqiIaV4/movie-history) for development progress and good places to jump in.*

Need to Install: 
Jquery, Handlebars, Lodash, HandleBars, Q, Bootstrap, Firebase, Bootstrap, Stars (bootstrap plugin)

Javascript files:
central-handling : Our central spot for all of our event handlers

dependencies : Defines bootstrap, jquery, handlebars, firebase, q

main : includes require.config information

login : Logs an existing user into site, pulling information from firebase

user-sign-up : Authenticates a new user and pushes user email, password into firebase

authcall : Deferred promise that returns authentication with email and pw
create-user-in-private-firebase : When you sign up, function createTheUser stores a users email and password as a promise, and gets called with sign up in centra-handling file. 

loadSearch : Populates movies from omda api and inserts into handlebar template each_movie.hbs on search movies in nav through PopulateMovies function.
With clickToAdd function, movies populated through search are then stored into firebase when add button is clicked. Function addSearchModal has a modal appear when searched movies are clicked on. Modal includes title of movie, year, and actors. 

grabMovies : Stores movies added by user in firebase under user key. Adds rating key set to 0, and Watched key set to false.

user-library: Allows the users library of movies to be populated or used in other modules.

movie-change: function rateMovie users stars plugin to store change of rating through ajax Patch method. Function watchMovie changes watch key in firebase through Patch Method when Watched on main page gets clicked.

delete-movie: Creates promise of ajax delete method to delete whole key in firebase & page. 