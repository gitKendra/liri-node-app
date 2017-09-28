// write the code you need to grab the data from keys.js. Then store the keys in a variable

var twitterKeys = require('./keys.js');
console.log(twitterKeys);
let command = process.argv[2];
let commandError = "I have my limits! I only respond to the following commands:"+
	"\nmy-tweets \nspotify-this-song \nmovie-this \ndo-what-it-says.";
// COMMANDS \\

// Make it so liri.js can take in one of the following commands:
switch(command){
	case "my-tweets":
		break;
	case "spotify-this-song":
		break;
	case "movie-this":
		break;
	case "do-what-it-says":
		break;
	default:
		console.log(commandError);
}

// my-tweets
// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets(){

}

// spotify-this-song
// node liri.js spotify-this-song '<song name here>'
// Shows Artist(s), song's name, preview link from Spotify, album
function spotifyThisSong(){
// If no song provided, use default "The Sign" by Ace of Base

// Else use node-spotify-api to retrieve song information
}

// movie-this
// node liri.js movie-this '<movie name here>'
// Shows movie details: title, year, IMDB rating, Rotten Tomatoes Rating, Country produced,
// language, plot, actors
function movieThis(){
// If no movie provided, use data for movie "Mr. Nobody"
  // * Title of the movie.
  // * Year the movie came out.
  // * IMDB Rating of the movie.
  // * Rotten Tomatoes Rating of the movie.
  // * Country where the movie was produced.
  // * Language of the movie.
  // * Plot of the movie.
  // * Actors in the movie.
}

// do-what-it-says
// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function doWhatItSays(){

}



// BONUS!! \\

// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file.
// Do not overwrite your file each time you run a command.