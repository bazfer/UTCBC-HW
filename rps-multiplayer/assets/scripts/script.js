// init firebase
var config = {
	apiKey: "AIzaSyDU5P_mDhJuCitIeteGWI8cRBP1ikqIw2w",
    authDomain: "morps-53ff5.firebaseapp.com",
    databaseURL: "https://morps-53ff5.firebaseio.com",
    storageBucket: "morps-53ff5.appspot.com",
    messagingSenderId: "495184088448"
};

firebase.initializeApp(config);

var database = firebase.database();
var connectionsRef = database.ref("/players");
var connectedRef = database.ref(".info/connected");


var key;

connectedRef.on("value", function(snap) {
  if (snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
    key = con.key;
   	
  }
});

var playNum = false;

connectionsRef.on("value", function(snap) {
  if (snap.numChildren() === 1){
    playnum = 1;
  }else if (snap.numChildren() === 2 && !playNum){
    playnum = 2;
  }
});

$("#submit").on("click", function(event) {
	move = $("#move").val().trim();
	
	

	event.preventDefault();
});




/*connectedRef.on("value", function(snap) {
  if (snap.val()) {
    var con = connectionsRef.push(true);
   	key = con.key;
   	console.log(key);
    con.onDisconnect().remove();
  }
});

var playNum = false;

connectionsRef.on("value", function(snap) {
  if (snap.numChildren() === 1){
    playNum = 1;

  }else if (snap.numChildren() === 2 && !playNum){
    playNum = 2;
  }
  database.ref().push({
		playNum: playNum
	});
});*/