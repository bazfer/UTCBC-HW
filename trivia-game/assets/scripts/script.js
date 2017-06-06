$(document).ready(function(){

var questions = [
	// 1
	{question: "The value of 5 in the number  357.21 is", correctAnswer: "5 tens", 
	answers: ["5 tenths", "5 ones", "5 tens", "5 hundreds"], imageURL:""},
	// 2
	{question: "In coordinate geometry, the equation of the x-axis is?", correctAnswer: "y = 0", 
	answers: ["y = x", "y = 0", "x = 0", "y = 1"], imageURL:""},
	// 3
	{question: "Which of the following is the Highest Common Factor of 18, 24 and 36?", 
	correctAnswer: "6", answers: ["6", "18", "36", "72"], imageURL:""},
	// 4
	{question: "How many subsets does the set {a, b, c, d, e} have?", correctAnswer: "32", 
	answers: ["2", "5", "10", "32"], imageURL:""},
	// 5
	{question: "Which of the following is NOT a prime number?", correctAnswer: "21", 
	answers: ["11", "21", "31", "41"], imageURL:""},
	// 6
	{question: "Which of the following is a subset of  {b, c, d}?", correctAnswer: "{ }", 
	answers: ["{ }", "{a}", "{1, 2, 3}", "{a, b, c}"], imageURL:""},
	// 7
	{question: "What is the sacred number??", 
	correctAnswer: "7", answers: ["2", "11", "7", "3"], imageURL:""},
	// 8
	{question: "3 4/5 expressed as a decimal is", correctAnswer: "3.80", 
	answers: ["3.40", "3.45", "3.50", "3.80"], imageURL:""},
	// 8
	{question: "3x - 4(x + 6) =", correctAnswer: "-x - 24", 
	answers: ["x + 6", "-x - 24", "7x + 6", "-7x - 24"], imageURL:""},
];

// VAR TO HOLD COUNTER VALUE FOR THE COUNTDOWN
var counter;

// VAR TO HOLD GLOBAL SCORE
var score = 0;

// FUNCTION TO GENERATE A RANDOM NUMBER BETWEEN 0 AND QUESTIONS ARRAY LENGTH
function randomNumber(max, min){
	return(Math.floor(Math.random() * (max - min) + min));
}

// MAIN GAME OBJECT
var trivia = {

	time: 27,
	currentCorrectAnswer: "",

	//TRANSITION FROM FEEDBACK TO NEXT QUESTION
	removeButton: function(){
		$("#next").off("click", "**");
		$("#next").remove();
	},

	//DISPLAY FEEDBACK AND NEXT BUTTON
	//FOR ALL CASES (TIMER EXPIRES, CORRECT ANSWERS, INCORRECT ANSWER)
	displayFeedback: function(result){

		$("#timer").html("");
		$(".liAnswers").remove();

		console.log("array " + questions.length);

		//CHECK IF QUESTIONS ARRAY IS EMPTY
		//IF IT IS NOT, DISPLAY REGULAR FEEDBACK AND NEXT BUTTON
		if(questions.length > 0){
			if(result === "expired"){
				$("#question").html("Time is up. Onto the next challenge.");
			}
			if(result === "correct"){
				$("#question").html("That is true. Onto the next challenge.");
			}
			if(result === "incorrect"){
				$("#question").html("That is not true. Onto the next challenge.");
			}
			$("#buttonCont").append("<div class='button' id='next'>Next</div>");
			$("#next").on("click", function(){
				trivia.grabAndDisplayQuestion();
			});

		//IF IT IS EMPTY, DISPLAY END GAME FEEDBACK	
		}
		if(questions.length == 0){
			console.log(score);
			$("#buttonCont").append("<div id='answers'>You succeeded <p id='finalScore'>" + score + "</p> times.</div>");
			$("#question").html("Congratulations, you've completed this test.");
			$("#score").remove();
		}
	},

	//HANDLING AN EXPIRED TIMER
	timeExpires: function(){
		var result = "expired";
		clearInterval(counter);
		trivia.displayFeedback(result);
	},

	//UPDATING TIMER EVERY SECOND
	timerUpdate: function(){
		trivia.time--;
		$("#timer").html(trivia.time);
		if(trivia.time === 0){
			trivia.timeExpires();
		}	
			
	},


	// INITIALIZE TIMER 
	initTimer: function(){
		trivia.time = 27;
		counter = setInterval(trivia.timerUpdate, 1000);
		$("#timer").html(trivia.time);

	},

	//PROCESS PLAYER'S ANSWERS

	processAnswer: function(answerText){
		if(answerText === currentCorrectAnswer){
			var result = "correct"
			clearInterval(counter);
			trivia.displayFeedback(result);
			score++;
			$("#score").html(score);
		} else {
			var result = "incorrect"
			clearInterval(counter);
			trivia.displayFeedback(result);
		}
	},


	//GRAB QUESTION FROM ARRAY AND DISPLAY IT
	grabAndDisplayQuestion: function(){

		//CLEARS ALL HTML CONTAINERS
		trivia.removeButton();

		//POINT TO ONE QUESTION OBJECT IN ARRAY
		var index = randomNumber(0,questions.length)

		//DISPLAY QUESTION
		var newQ = questions[index].question;
		$("#question").html(newQ);

		//DISPLAY ANSWERS
		for(i = 0; i < questions[index].answers.length; i++){

			var newA = questions[index].answers[i];
			$("#answers").append("<li class='liAnswers' id = " + i + " style = 'list-style-type: none'>" + newA + "</li>");
			$("#" + i).on("click", function(){
				var answerText = this.innerHTML;
				trivia.processAnswer(answerText);
			});
		}


		//KEEP TRACK OF CURRENT CORRECT ANSWER
		currentCorrectAnswer = questions[index].correctAnswer;

		//REMOVE QUESTION OBJECT FROM ARRAY
		questions.splice(index, 1);
		console.log("splice");

		//CALL TIMER
		trivia.initTimer();
	},	
}

//INITIALIZE GAME
trivia.grabAndDisplayQuestion();

});


/*
object to hold question data - question, answers, correct answer

array of question objects with all of the diff questions

randomly generate number to select question



remove said reference from array

grab data from question object

display question

start timer

if timer expires

	show timer expired feedback

	show next question button

if timer does not expire

	receive player's input

		compare player's input to object correct answer

			if equal

				show correct answer feedback

				count right answer

				show next question button

				correct guesses plus one

			if not equal

				show incorrect answer feedback

				show next question button

if array becomes empty

	show final tally

*/