//GLOBAL VARIABLES

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];
var marinesLeft = ["gorman", "bishop", "apone", "hicks", "ferro", "dietrich", "hudson", "spunkmeyer", "vasquez", "drake", "frost", "crowe", "wierzbowski"];
var displayArray = [];
var currentMarine = [];
var alreadyGuessed = [];
var currentIndex;
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

	//PICKS A RANDOM MARINE
	randomizer: function(){
		//ASSIGNING RGN VALUE TO GLOBAL VAR
		currentIndex = Math.random()*marinesLeft.length;
		//COLLECTING STRING BASED ON RGN
		var randomMarine = Math.floor(currentIndex);
		return (randomMarine);
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
		currentMarine = game.stringSplitter(marinesLeft[game.randomizer()]);
		console.log(currentMarine + "start here");
		this.charAppender(currentMarine);
		this.guessesInitializer(currentMarine.length);
	},

	// HANDLES A WIN CONDITION

	winHandler: function(){
		//VISUAL STUFF TO HAPPEN ON WINNING CONDITION
		
		//CALL TO REMOVE HTML UL ELEMENTS
		this.ulRemover();
		//REMOVING IDENTIFIED MARINE FROM SOURCE ARRAY
		if(marinesLeft.length > 0){
			marinesLeft.splice(currentIndex,1);
			console.log(marinesLeft);
		} else if(marinesLeft == 0){
			//WON GAME CODE
		}
		//RE-INITIALIZING GAME
		this.initializer();
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



