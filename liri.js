// NPM requirements
const fs = require('fs');
const request = require('request');
const twitter = require('twitter');
const spotify = require('node-spotify-api');

// write the code you need to grab the data from keys.js. Then store the keys in a variable
const twitterKeys = require('./keys.js');
var client = new twitter(twitterKeys);

let arg = process.argv;
let command = arg[2];
let commandError = "I have my limits! I only respond to the following commands:"+
	"\nmy-tweets \nspotify-this-song \nmovie-this \ndo-what-it-says.";

let search = arg[3];
// for(var i = 2; arg.length; i++){
// 	// console.log(search);
// 	search += arg[i] + " ";
// }
console.log("Command: " + command);
console.log("Searching for " + search);

// COMMANDS \\

// Make it so liri.js can take in one of the following commands:
switch(command){
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		// let song = process.argv[3];
		// if(song != null)
		// 	spotifyThisSong(song);
		// else 
		// 	spotifyThisSong("The Sign"); // default search if none provided
		break;
	case "movie-this":
		// let movie = process.argv[3];
		// if(movie != null)
		// 	movieThis(movie);
		// else 
		// 	movieThis("Mr. Nobody"); // default search if none provided
		break;
	case "do-what-it-says":
		// doWhatItSays(process.argv[3]);
		break;
	// Print error if user
	default:
		console.log(commandError);
}

// my-tweets
// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets(){
	console.log("myTweets");
	// Get recent tweets from API
	client.get('statuses/user_timeline', {q: '@KendraSpoof'}, function(error, tweets, response) {
   		if(error) console.log(error);
console.log(tweets[0]);
		// Print the 20 most recent tweets
		for(var i = 0; i < tweets.length && i < 20; i++){
			console.log("%s : %s", tweets[i].created_at, tweets[i].text);
		}
	});
}

// spotify-this-song
// node liri.js spotify-this-song '<song name here>'
// Shows Artist(s), song's name, preview link from Spotify, album
function spotifyThisSong(song){
	console.log("spotifyThisSong");
	// Request song from api

	//
}

// movie-this
// node liri.js movie-this '<movie name here>'
// Shows movie details: title, year, IMDB rating, Rotten Tomatoes Rating, Country produced,
// language, plot, actors
function movieThis(movie){
	console.log("movieThis");
	// Request the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		// If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode === 200) {
		console.log(JSON.parse(body));

		}
		// If no movie provided, use data for movie "Mr. Nobody"
		// * Title of the movie.
		// * Year the movie came out.
		// * IMDB Rating of the movie.
		// * Rotten Tomatoes Rating of the movie.
		// * Country where the movie was produced.
		// * Language of the movie.
		// * Plot of the movie.
		// * Actors in the movie.
	});
}
// do-what-it-says
// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function doWhatItSays(){
	console.log("doWhatItSays");
}



// BONUS!! \\

// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file.
// Do not overwrite your file each time you run a command.