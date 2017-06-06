//GLOBAL VARIABLES

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];
var marinesLeft = ["gorman", "bishop", "apone", "hicks", "ferro", "dietrich", "hudson", 
"spunkmeyer", "vasquez", "drake", "frost", "crowe", "wierzbowski", "burke", "ripley"];
var marinesImages = ["assets/images/001.png", "assets/images/002.png", "assets/images/003.png", 
"assets/images/004.png", "assets/images/005.png", "assets/images/006.png", "assets/images/007.png", 
"assets/images/008.png", "assets/images/009.png", "assets/images/010.png", "assets/images/011.png", 
"assets/images/012.png", "assets/images/013.png", "assets/images/014.png", "assets/images/015.png" ]
var displayArray = [];
var currentMarine = [];
var alreadyGuessed = [];
var rgn;
var totalMatches;

var game = {
//GAME PROPERTIES
	
//GAME METHODS

	//REMOVES HTML UL ELEMENTS
	ulRemover: function(){
		for(i = 0; i < currentMarine.length; i++){
			var ulToRemove = document.getElementById(i);
			ulToRemove.parentNode.removeChild(ulToRemove);
		}
	},

	//ROLLS RGN
	randomizer: function(){
		//ASSIGNING RGN VALUE TO GLOBAL VAR
		rgn = Math.floor(Math.random()*marinesLeft.length);
		return(rgn);
	},

	//SPLITS MARINE STRING INTO AN ARRAY OF LETTERS
	stringSplitter: function(stringToSplit){
		var splitMarine = stringToSplit.split("");
		return (splitMarine);
	},

	//APPENDS ARRAY OF LETTERS TO HTML DIV
	charAppender: function(arrayToAppend){
		wordContainer = document.getElementById('wordContainer');
		word = document.createElement('ul');

		for(i=0; i < arrayToAppend.length; i++){
			word.setAttribute('id', 'word');
			letter = document.createElement('li');
			displayArray[i] = "_"; 

			letter.innerHTML = displayArray[i];
			letter.setAttribute('class', 'letter');
			letter.setAttribute('id', i);
			wordContainer.appendChild(word);
			word.appendChild(letter);
		}
		//console.log(displayArray);
	},

	//DISPLAY MARINE IMAGE
	imageDisplayer: function(rgn){

		if(document.getElementById("currentImage") == null) {
			console.log("null, proceed");
			var imageContainer = document.getElementById("imageContainer");
			var image = document.createElement('img');
			image.setAttribute("src", marinesImages[rgn]);
			image.setAttribute("id", "currentImage");
			imageContainer.appendChild(image);
		} else {
		
			var currentImage = document.getElementById("currentImage");
			currentImage.parentNode.removeChild(currentImage);
			var imageContainer = document.getElementById("imageContainer");
			var image = document.createElement('img');
			image.setAttribute("src", marinesImages[rgn]);
			image.setAttribute("id", "currentImage");
			imageContainer.appendChild(image);
		}
		
	},

	//INITIALIZES NUMBER OF GUESSES LEFT TO 70% OF THE MARINE LAST NAME LENGTH
	guessesInitializer: function(wordLength){
		var guesses = Math.floor(wordLength*0.7);
		document.getElementById('guessesContainer').innerHTML=guesses;
	},

	//ADDS GUESS TO ALREADYGUESSED
	alreadyAdder: function(letterToAdd){
		alreadyGuessed.push(letterToAdd);
		console.log(alreadyGuessed);
	},

	//HANDLES FAILED MATCH CASES
	failHandler: function() {

		//DECREASE NUMBER OF GUESSES LEFT
		guesses = document.getElementById("guessesContainer").innerHTML;
		guesses--;
		document.getElementById("guessesContainer").innerHTML = guesses;
		//console.log(guesses);
	},

	//DISPLAYS ALREADY GUESSED LETTERS
	alreadyDisplayer: function(pressedKey){
		wordContainer = document.getElementById('alreadyGuessed');
		alreadyLetters = document.createElement('ul');
		alreadyLetters.setAttribute('class', 'alreadyUl');
			
		alreadyChar = document.createElement('li');
		alreadyChar.innerHTML = pressedKey;
		alreadyChar.setAttribute('class', 'alreadyLi');

		wordContainer.appendChild(alreadyLetters);
		alreadyLetters.appendChild(alreadyChar);
		
	},


	//REVEALS MATCHED LETTER
	letterRevealer: function(pressedKey, matchPosition){

		for(j = 0; j < matchPosition.length; j++)
			for(i = 0; i < currentMarine.length; i++){
				if(matchPosition[j] == i){
					displayArray[i] = pressedKey;
					document.getElementById(i).innerHTML = pressedKey;
					//console.log(i);
				}
			}
			
		//CHECK FOR WINNING CONDITION

		if(totalMatches == currentMarine.length){
			
			this.winHandler();
		}
	
	},

	//REMOVE ALREADY GUESSED LETTERS 
	alreadyRemover: function(){
		
		document.getElementById("alreadyGuessed").innerHTML = "";
		//child.parentNode.removeChild(child);
	},

	initializer: function() {
		this.alreadyRemover();
		totalMatches = 0;
		alreadyGuessed = [];
		rgn = this.randomizer();
		currentMarine = this.stringSplitter(marinesLeft[rgn]);
		console.log("start here " + currentMarine);
		this.imageDisplayer(rgn);
		this.charAppender(currentMarine);
		this.guessesInitializer(currentMarine.length);
	},

	//HANDLES THE END OF THE GAMEdrake

	endGame: function(){
		console.log("end of the line");
		document.body.innerHTML = "";

		endText = document.createElement('h1');
		endText.innerHTML = 'Game Over Man';
		document.body.appendChild(endText);
		endText.setAttributefros("id", "endText");

		endImageContainer = document.createElement('div');
		endImage = document.createElement('img');

		endImageContainer.setAttribute("id", "endImageContainer");
		endImage.setAttribute("id", "endImage");

		document.body.appendChild(endImageContainer);
		endImageContainer.appendChild(endImage);

		endImage.setAttribute("src", "assets/images/all.jpg");
	},

	// HANDLES A WIN CONDITION

	winHandler: function(){
		//VISUAL STUFF TO HAPPEN ON WINNING CONDITION
		
		//CALL TO REMOVE HTML UL ELEMENTS
		this.ulRemover();
		//REMOVING IDENTIFIED MARINE FROM SOURCE ARRAY
			console.log(marinesLeft.length);
		if(marinesLeft.length > 1){
			marinesLeft.splice(rgn,1);
			marinesImages.splice(rgn,1);
			console.log(marinesLeft);
			console.log(marinesLeft.length);
			this.initializer();
		} else { 
			this.endGame();
		}
	},

	//HANDLES A LOSS CONDITION
	lossHandler: function(){

		//WHATEVER IS GONNA HAPPEN VISUALLY GOES HERE
		console.log("You Lost")

		//REMOVE HTML UL ELEMENTS

		this.ulRemover();

		//RE-INITIALIZE GAME
		
		this.initializer();
	},

	//COMPARES PLAYER'S GUESS TO EVERY INDEX OF ARRAY OF LETTERS AND CALLS FUNCTIONS BASED ON RESULTS
	checkMatch: function(pressedKey) {
		console.log(pressedKey);
		// VARIABLE WITH TWO FUNCTIONS: CHECK IF THERE WAS A SUCCESSFUL MATCH AND 
		// ADDITIONAL COUNTER FOR NESTED ARRAYS
		var matches = 0;
		// ARRAY TO STORE POSITIONS OF ALL MATCHED
		var matchPosition = [];

		// CHECK IF GUESS IS A DUPLICATE

		for(i = 0; i < alreadyGuessed.length; i++){
			if(pressedKey == alreadyGuessed[i]){
				console.log("take a different guess");
				return(false);
			}
		}
		
		// ADD GUESS TO ALREADY GUESSED

		this.alreadyAdder(pressedKey);
		this.alreadyDisplayer(pressedKey);

		// CONTINUE IF GUESS IS NOT A DUPLICATE

		for(i = 0; i < currentMarine.length; i++){
			
			if(pressedKey == currentMarine[i]){
				matchPosition[matches] = i; 
				matches++;
				totalMatches++;
			} 
		}

		//CALL FUNCTION TO REVEAL MATCHED LETTERS IN HTML
		this.letterRevealer(pressedKey, matchPosition);

		//CALL FUNCTION TO DEAL WITH FAILED GUESS

		if(matches == 0) {
				this.failHandler();

		//CHECK FOR LOSING CONDITION	

			if(guesses == 0){
				this.lossHandler();
			}

		}
		
	}

}


window.onload = function(){
	game.initializer();
}

document.onkeyup = function(event) {
	game.checkMatch(event.key);
}



