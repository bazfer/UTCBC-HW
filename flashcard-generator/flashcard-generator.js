var fs = require("fs");
var inquirer = require("inquirer");

// TOOLS

// *** ZERO PADDING ***
function padZeroes(id, length){
    var idString = String(id);
    while (idString.length < length)
        idString = "0" + idString;
    return(idString);
};

// *** RANDOMIZER ***
function randomizer(cap){
    var random = Math.floor(Math.random()*5) + 1;
    return random;
}

// BASIC CARD CONSTRUCTOR
function BasicCard(front, back){
    if(this instanceof BasicCard){
        this.front = front;
        this.back = back;
    } else {
        return new BasicCard(front, back);
    }
    
}
// ADDING PRINT CARD TO BASICCARD PROTOTYPE
BasicCard.prototype.printCard = function(){
    console.log("Question: " + this.front + "\nAnswer: " + this.back);
}

// CLOZE CARD CONSTRUCTOR
function ClozeCard(text, cloze){
    if(this instanceof ClozeCard){
        this.text = text;
        this.cloze = cloze;
        this.hidden = text.replace(cloze, "( ... )")
    } else {
        return new ClozeCard(text, cloze);
    }
    
}
// ADDING PRINT CARD TO CLOZECCARD PROTOTYPE
ClozeCard.prototype.printCard = function(){
    if(this.text.includes(this.cloze)){
        console.log("Card stored as: " + this.hidden);
    } else {
        console.log("Error: text to hide not in full text.")
    }
}

switch(process.argv[2]) {
    case "basic":
        var askForInput = inquirer.prompt([
    {
        type:"input",
        name: "question",
        message: "Enter the question text: "
        
    },
    {
        type:"input",
        name: "answer",
        message: "Enter the answer text: "
       
    }
    ]).then(function(data){
        var newCard = BasicCard(data.question, data.answer);
        newCard.printCard();
    });
    break;
    case "cloze":
        var askForInput = inquirer.prompt([
    {
        type:"input",
        name: "text",
        message: "Enter the full text: "
        
    },
    {
        type:"input",
        name: "clozed",
        message: "What portion ot the test do you want to hide?"
       
    }
    ]).then(function(data){
        var newCard = ClozeCard(data.text, data.clozed);
        newCard.printCard();
    });
    break;
    default:
        console.log("Incorrect card type: run file from node adding 'basic' for Basic Cards or 'cloze' for Cloze Cards.")
}