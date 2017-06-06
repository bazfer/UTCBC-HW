// npm libaries

var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

// code to take commands ( tweets / spotify-this-song / movie-this / do-what-it-says )
var command = process.argv[2];

// my-tweets will show the last 20 tweets *** it can also take one argument (twitter user)

function tweets() {
	// twitter keys
	var twitterKeys = require("./keys.js");
	// keyholder
	var client = new Twitter({
		consumer_key: twitterKeys.twitterKeys.consumer_key,
		consumer_secret: twitterKeys.twitterKeys.consumer_secret,
		access_token_key: twitterKeys.twitterKeys.access_token_key,
		access_token_secret: twitterKeys.twitterKeys.access_token_secret
	});

	// request parameters
	var params = { screen_name: process.argv[3], count: 20 };

	// request 
	client.get("https://api.twitter.com/1.1/statuses/user_timeline.json", params, function (error, tweets, response) {
		if (!error) {
			console.log(tweets);
		} else {
			console.log(error);
		}
	});
}

// spotify-this-song will show artist, preview link, album
// if no song is provide send "the sign" by ace of base

function spotified() {
	if (process.argv[3]) {
		var song = process.argv[3];
	} else {
		var song = "Breakerfall";
	}
	spotify.search({ type: 'track', query: song }, function (err, data) {
		if (!err) {
			var handle = data.tracks.items;
			console.log(handle[0].name);
			console.log(handle[0].album.name);
			console.log(handle[0].preview_url);
			
		} else {
			console.log('Error occurred: ' + err);
			return;
		}
	});
}

// movie-this will output title, year, rating, country of production, language, plot, actors, rotten rating, rotten url
// if no song is provided send "mr. nobody"

function omdb() {
	if (process.argv[3]) {
		var movie = process.argv[3];
	} else {
		var movie = "Mr. Nobody";
	}
	var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&r=json";

	request(url, function (error, response, body) {

		if (!error && response.statusCode === 200) {
			var handle = JSON.parse(body);
			console.log(handle.Title);
			console.log(handle.Year);
			console.log(handle.Rated);
			console.log(handle.Country);
			console.log(handle.Language);
			console.log(handle.Plot);
			console.log(handle.Actors);
			console.log(handle.tomatoRating);
			console.log(handle.tomatoURL);

		} else {
			console.log(error);
		}
	}); 
}
// do what it says uses random. txt to call one of the command components

switch (command) {
	case 'my-tweets':
		console.log("my-tweets");
		tweets();
		break;
	case 'spotify-this':
		console.log("spotify-this-song");
		spotified();
		break;
	case 'movie-this':
		console.log("movie-this");
		omdb();
		break;
	case 'shuffle':
		var min = 1;
		var max = 4;
		var RGN = Math.floor(Math.random() * (max - min) + min);
		console.log(RGN);
		switch(RGN) {
			case 1:
				console.log("my-tweets");
				tweets();
				break;
			case 2:
				console.log("spotify-this-song");
				spotified();
				break;
			case 3:
				console.log("movie-this");
				omdb();
			break;
			default:
				console.log("Error");
				break;
		}
		break;
	default:
		console.log("What do you want to do? my-tweets | spotify-this-son | movie-this | do-what-it-says")
		break;
}

