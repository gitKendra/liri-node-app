// NPM requirements
const fs = require('fs');
const request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const Keys = require('./keys.js');
const _ = require('underscore');

// Add my credentials to the different Twitter and Spotify instances
let twitter = new Twitter(Keys.twitterKeys);
let spotify = new Spotify(Keys.spotifyKeys);

let commandError = "ERROR: Invalid command. Use one of the following commands:"+
	"\nmy-tweets \nspotify-this-song \nmovie-this \ndo-what-it-says";
let arg = process.argv;
let command = arg[2];
let search = arg[3];
if(search !== undefined){
	for(var i = 4; i < arg.length; i++){
		search += "+" + arg[i];
	}
}

run(command, search);
// console.log("Command: " + command);
// console.log("Searching for " + search);

// COMMANDS \\
function run(command, search){
	// Make it so liri.js can take in one of the following commands:
	switch(command){
		case "my-tweets":
			myTweets();
			break;
		case "spotify-this-song":
			spotifyThisSong(search);
			break;
		case "movie-this":
			movieThis(search);
			break;
		case "do-what-it-says":
			doWhatItSays();
			break;
		// Print error if user enters invalid command
		default:
			console.log(commandError);
	}
}
// my-tweets
// node liri.js my-tweets
// Function shows your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets(){
	console.log("myTweets");
	// Get recent tweets from API
	twitter.get('statuses/user_timeline', {q: '@KendraSpoof'}, function(error, tweets, response) {
   		if(error) console.log(error);
   		// Loop through tweets and print the date/time and tweet for the 20 most recent tweets
		for(var i = 0; i < tweets.length && i < 20; i++){
			console.log("%s : %s", tweets[i].created_at, tweets[i].text);
		}
	});
}

// spotify-this-song
// node liri.js spotify-this-song '<song name here>'
// Shows Artist(s), song's name, preview link from Spotify, album
function spotifyThisSong(song){
	if(song === undefined){
		song = "The+Sign";
	}	
	console.log("spotifyThisSong: "+song);
	// Request song from api
	spotify.search({ type: 'track', query: song }, function(err, data) {
		if(err){
			return console.log('Error occurred: ' + err);
		}
		var songInfo = data.tracks.items[0].artists;
		console.log(songInfo);
	});
}

// movie-this
// node liri.js movie-this '<movie name here>'
// Shows movie details: title, year, IMDB rating, Rotten Tomatoes Rating, Country produced,
// language, plot, actors
function movieThis(movie){
	if(movie === undefined){
		movie = "Mr.+Nobody";
	}
	console.log("movieThis: "+movie);
	// Request the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		// If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode === 200) {
	//	console.log(JSON.parse(body));
			// Set variable to hold API body as Object
			let movieInfo = JSON.parse(body);
			let imdb = "Not rated.";
			let rt = "Not rated.";

			// Find IMDB and Rotten Tomatoes rating
			if(movieInfo.Ratings[0] !== undefined){
				imdb = _.find(movieInfo.Ratings, function(rating){ return rating.Source === "Internet Movie Database"}).Value;
				rt = _.find(movieInfo.Ratings, function(rating){ return rating.Source === "Rotten Tomatoes"}).Value;
			}
			// * Title of the movie.
			console.log("Movie Title: " + movieInfo.Title);
			// * Year the movie came out.
			console.log("Year: " + movieInfo.Year);
			// * IMDB Rating of the movie.
			console.log("IMDB Rating: " + imdb);
			// * Rotten Tomatoes Rating of the movie.
			console.log("Rotten Tomatoes Rating: " + rt);
			// * Country where the movie was produced.
			console.log("Country: " + movieInfo.Country);
			// * Language of the movie.
			console.log("Language: " + movieInfo.Language);
			// * Plot of the movie.
			console.log("Plot: " + movieInfo.Plot);
			// * Actors in the movie.	
			console.log("Actors: " + movieInfo.Actors);		
		}

	});
}
// do-what-it-says
// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function doWhatItSays(){
	console.log("doWhatItSays");

	fs.readFile('random.txt', 'utf8', function(err, data){
		if(err) return console.log(err);

		console.log(data);
		var arg = data.split(",");
		
		// Remove any quotes from text file
		let search = arg[1].replace(/"/g, '');
		console.log(search);
		// Replace spaces with + symbols to match API search requirements
		search = search.replace(/ /g, '+');
		console.log(search);

		run(arg[0], search);

	});
}



// BONUS!! \\

// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file.
// Do not overwrite your file each time you run a command.