function statCalc(max, min){
	return(Math.floor(Math.random() * (max - min) + min));
}

var playerChar = {
	name: "",
	HP: 0,
	AP: 0,
	CAP: 0,
	iconURL: ""
}

var currentOpp = {
	name: "",
	HP: 0,
	AP: 0,
	CAP: 0,
	iconURL:""
}

var characters = [
		{
			name: "Dragon",
			HP: statCalc(10,15),
			AP: statCalc(2,6),
			CAP: statCalc(15,20),
			iconURL: "assets/images/c1.jpg"

		},

		{
			name: "Phantasm",
			HP: statCalc(150,120),
			AP: statCalc(3,5),
			CAP: statCalc(20,25),
			iconURL: "assets/images/c2.jpg"

		},

		{
			name: "Gnome",
			HP: statCalc(160,140),
			AP: statCalc(4,8),
			CAP: statCalc(15,25),
			iconURL: "assets/images/c3.jpg"

		},

		{
			name: "Bullfrog",
			HP: statCalc(130,100),
			AP: statCalc(1000,1000),
			CAP: statCalc(30,40),
			iconURL: "assets/images/c4.jpg"

		}	

	];

var game = {

	restart: function(){
		$(".button").remove();
		window.location.reload(false);
	},

	addRestartBt: function(){
		var div = "<div class='button' id='restartBt'>Restart</div>";
		$("#charCont").prepend(div);
		// ADD EVENT LISTENER
			$("#restartBt").on("click", function(){
		// CALL FUNCTION
			game.restart();
		});
	},

	endGame: function(){
		$("#player").remove();
		var infoMsg = "<div class='text'>Victory!</div>";
		$("#infoCont").prepend(infoMsg);
		game.addRestartBt();
		
	},

	playerCharDeath: function(){
		$("#instr").remove();
		$("#player").remove();
		$(".opp").remove();
		$("#currentOpp").remove();
		var infoMsg = "<div class='text'>Defeat</div>";
		$("#infoCont").prepend(infoMsg);
		game.addRestartBt();

	},

	currentOppDeath: function(){
		$("#instr").remove();
		$("#attackBt").off();
		$("#currentOpp").remove();
		// CHECK FOR ENDGAME
		if(characters.length == 0){
			game.endGame();
		} else {
			game.oppAddEventListener();
			$(".opp").remove();
			game.oppAppender();
		}
	},

	attackRound: function(){
		
		// SUBSTRACT PLAYER AP FROM OPPONENT HP
		currentOpp.HP = currentOpp.HP - playerChar.AP;
		// SUBSTRACT OPPONENT CAP FROM PLAYER AP
		playerChar.HP = playerChar.HP - playerChar.CAP;
		// CHECK FOR DEATH
		if(currentOpp.HP <= 0){
			game.currentOppDeath();
		}

		if(playerChar.HP <= 0){
			game.playerCharDeath();
		}
		// INCREASE PLAYER AP
		playerChar.AP = playerChar.AP * 2;

		// UPDATE ALL HTML

		var playerHpDiv = "<div class='text' id='playerHp'>HP: " + playerChar.HP + "</div>";
		var playerApDiv = "<div class='text' id='playerAp'>AP: " + playerChar.AP + "</div>";
		var oppHpDiv = "<div class='text' id='oppHp'>HP: " + currentOpp.HP + "</div>";

		$("#playerHp").replaceWith(playerHpDiv);
		$("#playerAp").replaceWith(playerApDiv);
		$("#oppHp").replaceWith(oppHpDiv);


	},

	addAttackBt: function(){
		var div = "<div class='button' id='attackBt'>Attack</div>";
		$("#currentOpp").prepend(div);
		// ADD EVENT LISTENER
			$("#attackBt").on("click", function(){
		// CALL FUNCTION
			game.attackRound();
		});
	},

	currOppAppender: function(index){
		$("#instr").remove();
		
		// CREATE VARIABLE TO HOLD DYNAMIC HTML DIV CONTENT	
		var div = "<div id='currentOpp'></div>";
		var hpDiv = "<div class='text' id='oppHp'>HP: " + currentOpp.HP + "</div>";
		var apDiv = "<div class='text' id='oppAp'>AP: " + currentOpp.AP + "</div>";
		var capDiv = "<div class='text' id='oppCap'>CAP: " + currentOpp.CAP + "</div>";
		// APPEND DYNAMIC HTML CONTENT TO CONTAINER AND ADD CLASS
		$("#currOppCont").append(div);
		$("#"+(i)).attr("class", "currOpp");
		// CREATE VARIABLE TO HOLD DYNAMIC IMAGE AND SET ATTRIBUTES
		var img = document.createElement("img");
		img.src = currentOpp.iconURL;
		img.alt = currentOpp.name;
		img.setAttribute('class', 'img');
		img.setAttribute('id', 'currImg');
		// APPEND ALL CONTENT
		$("#currentOpp").append(img);
		$("#currentOpp").append(hpDiv);
		$("#currentOpp").append(apDiv);
		$("#currentOpp").append(capDiv);
		
		var infoMsg = "<div id='instr' class='text'>Attack!</div>";
		$("#infoCont").prepend(infoMsg);

		game.addAttackBt();

	},


	selectOpp: function(index){
		$("#"+index).remove();
		$(".opp").off();
		for(i = 0; i < characters.length; i++){
			if(index == i){
				var match = i;
				currentOpp.name = characters[i].name;
				currentOpp.HP = characters[i].HP;
				currentOpp.AP = characters[i].AP;
				currentOpp.CAP = characters[i].CAP;
				currentOpp.iconURL = characters[i].iconURL;
				$("#"+(i)).attr("id", "currentOpp");
			}
		}
		characters.splice(match, 1);
		game.currOppAppender(match);
		

	},

	oppAddEventListener: function(){
	// ADD EVENT LISTENER TO IMAGE CONTAINERS
		$(".opp").on("click", function(){
	// PASS ARRAY INDEX TO FUNCTION THAT SELECTS OPPONENT
		game.selectOpp($(this).attr("id"));
		});
	},



	oppAppender: function(){
		
		
		for(i = 0; i < characters.length; i++){
		// CREATE VARIABLE TO HOLD DYNAMIC HTML DIV CONTENT	
			var div = "<div id='" + (i) +"'></div>";
			var hpDiv = "<div class='text' id='hp" + (i) +"'>HP: " + characters[i].HP + "</div>";
			var apDiv = "<div class='text' id='ap" + (i) +"'>AP: " + characters[i].AP + "</div>";
			var capDiv = "<div class='text' id='cap" + (i) +"'>CAP: " + characters[i].CAP + "</div>";
		// APPEND DYNAMIC HTML CONTENT TO CONTAINER AND ADD CLASS
			$("#oppCont").append(div);
			$("#"+(i)).attr("class", "opp");
		// CREATE VARIABLE TO HOLD DYNAMIC IMAGE AND SET ATTRIBUTES
			var img = document.createElement("img");
			img.src = characters[i].iconURL;
			img.alt = characters[i].name;
			img.setAttribute('class', 'img');
			img.setAttribute('id', 'img' + i);
		// APPEND ALL CONTENT
			$("#"+(i)).append(img);
			$("#"+(i)).append(hpDiv);
			$("#"+(i)).append(apDiv);
			$("#"+(i)).append(capDiv);
		}
		game.oppAddEventListener();
	},

	/*updateOppIds: function(){

	},*/

	selectChar: function(index){
		$("#instr").remove();
		// REMOVE EVENT LISTENER THAT TRIGGERS THIS FUNCTION
		$(".char").off();
		// FIND SELECTED CHAR, PASS ATTRIBUTES TO NEW VAR AND
		// REMOVE IT FROM CHARACTERS ARRAY
		for(i = 0; i < characters.length; i++){
			if(index == i){
				var match = i;
				playerChar.name = characters[i].name;
				playerChar.HP = characters[i].HP;
				playerChar.AP = characters[i].AP;
				playerChar.CAP = characters[i].CAP;
				playerChar.iconURL = characters[i].iconURL;
				$("#"+(i)).attr("id", "player");

			} else {
		// REMOVE OPPONENTS FROM TOP AND ADD TO BOTTOM
				$("#"+(i)).remove();
			}
		}
		// UPDATE PLAYER CHAR ATTRIBUTES
		$("#hp"+(match)).attr("id", "playerHp");
		$("#ap"+(match)).attr("id", "playerAp");
		$("#cap"+(match)).attr("id", "playerCap");
		// REMOVE PLAYER CHAR FROM CHARACTERS
		characters.splice(match, 1);
		// CALL FUNCTION TO ADD OPPONENTS CONTENT
		var infoMsg = "<div id='instr' class='text'>Choose Opponent</div>";
		$("#infoCont").prepend(infoMsg);
		game.oppAppender();
	},

	charAppender: function(){
		for(i = 0; i < characters.length; i++){
		// CREATE VARIABLE TO HOLD DYNAMIC HTML DIV CONTENT
			var div = "<div id='" + (i) +"'></div>";
			var hpDiv = "<div class='text' id='hp" + (i) +"'>HP: " + characters[i].HP + "</div>";
			var apDiv = "<div class='text' id='ap" + (i) +"'>AP: " + characters[i].AP + "</div>";
			var capDiv = "<div class='text' id='cap" + (i) +"'>CAP: " + characters[i].CAP + "</div>";
		// APPEND DYNAMIC HTML CONTENT TO CONTAINER AND ADD CLASS
			$("#charCont").append(div);
			$("#"+(i)).attr("class", "char");
		// CREATE VARIABLE TO HOLD DYNAMIC IMAGE AND SET ATTRIBUTES
			var img = document.createElement("img");
			img.src = characters[i].iconURL;
			img.alt = characters[i].name;
			img.setAttribute('class', 'img');
			img.setAttribute('id', 'img' + i);
		// APPEND ALL CONTENT
			$("#"+(i)).append(img);
			$("#"+(i)).append(hpDiv);
			$("#"+(i)).append(apDiv);
			$("#"+(i)).append(capDiv);
		}
		// ADD EVENT LISTENER TO IMAGE CONTAINERS
		$(".char").on("click", function(){
		// PASS ARRAY INDEX TO FUNCTION THAT SELECTS PLAYABLE CHAR
			game.selectChar($(this).attr("id"));
		});
		var infoMsg = "<div id='instr' class='text'>Choose Character</div>";
		$("#infoCont").prepend(infoMsg);
	}
}


function init(){
	
	$(".opp").remove();
	$("#currentOpp").remove();
	game.charAppender();
}

$(document).ready(init());