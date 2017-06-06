// init firebase

var config = {
	apiKey: "AIzaSyAJlo5F2TWb7Uok8C27brU2WtTeq953M_M",
    authDomain: "train-d5ca5.firebaseapp.com",
    databaseURL: "https://train-d5ca5.firebaseio.com",
    storageBucket: "train-d5ca5.appspot.com",
    messagingSenderId: "571801780555"
};

firebase.initializeApp(config)

var database = firebase.database();

// capture entries

$("#submit").on("click", function(event) {
	train = $("#train").val().trim();
	destination = $("#destination").val().trim();
	time = $("#time").val().trim();
	frequency = $("#frequency").val().trim();

	database.ref().push({
		train : train,
		destination : destination,
		time : time,
		frequency : frequency
	})

	event.preventDefault();
});

database.ref().on("child_added", function(snapshot) {
	var data = snapshot.val();
	var train = data.train;
	var destination = data.destination;
	var time = data.time;
	var frequency = data.frequency;
	var rem = frequency - calcRem(time)%frequency;
	console.log(rem);
	var next = moment().add(rem, "minutes").format("HH:mm");
	console.log(next);
	var trTag = $("<tr>");
	trTag.append("<td>" + train + "</td>" +
				"<td>" + destination + "</td>" +
				"<td>" + frequency + "</td>" +
				"<td>" + next + "</td>" +
				"<td>" + rem + "</td>"
				);
	$("#tbody").append(trTag);


}, function(errorObject) {
	console.log("Errors handled: " + errorObject.code);

});

function calcRem(time, frequency) {
	var startTime = moment(time, "HH:mm");
	console.log(startTime);
	return moment().diff(startTime, "minutes");
}