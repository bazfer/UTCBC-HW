var simpsonsArray = [
	["homer", false], ["marge", false], ["bart", false], ["lisa", false], ["maggie", false]
]

var lookUpSprite = {
"homer": "assets/images/homer.png",
"marge": "assets/images/marge.png",
"bart": "assets/images/bart.png",
"lisa": "assets/images/lisa.png",
"maggie": "assets/images/maggie.png"
}

var lookUpSpriteBW = {
"homer": "assets/images/homer-bw.png",
"marge": "assets/images/marge-bw.png",
"bart": "assets/images/bart-bw.png",
"lisa": "assets/images/lisa-bw.png",
"maggie": "assets/images/maggie-bw.png"
}


// function to play and stop gifs
function playStop(){
	var state = $(this).attr("data-state");
	 if(state === "still"){
        $(this).attr("src", $(this).data("animate"));
        state = "animate";
        $(this).attr("data-state", state);
      } else {
        $(this).attr("src", $(this).data("still"));
        state = "still";
        $(this).attr("data-state", state);
      }
}

// element click function
function getGifs(){
	// empty gifs container
	$("#gifsCont").empty();
	// grab element button value
	var querySimpson = ($(this).attr("data-value"));
	// construct query URL
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + querySimpson + "+simpson&limit=10&api_key=dc6zaTOxFJmzC";   
	//construct AJAX call
	$.ajax({ url: queryURL, method: "GET" }).done(function(response) {
	console.log(response);
	// parse response
	for(i = 0; i < response.data.length; i++){
		// create virtual container for each gif
		gifDiv = $("<div class='gifWrapper' id=gif0" + (i+1) + "></div>");
		// appending virtual container to DOM
		$("#gifsCont").append(gifDiv);
		// virtual container for rating
		var rating = response.data[i].rating;
		// create DOM container for rating and prepend it
		$("#gif0" + (i+1)).prepend("<div class='text' class='rating'>Rating:" + rating + "</div>");
		// virtual container for image
		var vGif = $("<img class='gifBt' src='" 
								+ response.data[i].images.downsized_still.url + 
								"' data-still='" 
								+ response.data[i].images.downsized_still.url + 
								"' data-animate='" 
								+ response.data[i].images.downsized.url + 
								"' data-state='still'>");
		// append image to DOM
		$(gifDiv).append(vGif);
	
	}	
	// add click event listener to all gifs	
	$(document).on("click", ".gifBt", playStop);	
	});
}

function renderButtons(simpsonName) {
	// remove all buttons from container
	$("#buttonsCont").empty();
	
	// re-add all elements to document
	for(i = 0; i < simpsonsArray.length; i++){

		// create virtual image
		var vImage = $("<img>");
		// check if button is ON or OFF
		if(simpsonsArray[i][1]){
		// if ON
		console.log(simpsonsArray[i][0] + " " + simpsonsArray[i][1]);
			var imageURL = lookUpSprite[simpsonsArray[i][0]];
			// adding classes
			vImage.addClass("simpson");
		} else { 
			var imageURL = lookUpSpriteBW[simpsonsArray[i][0]];
		}

		
		
		
		// add src attribute to virtual image
		vImage.attr("src", imageURL);
		// adding custom data attribute to store value
		vImage.attr("data-value", simpsonsArray[i]);
		// adding text to display
		vImage.text(simpsonsArray[i]);
		// adding type to prevent DOM reload
		vImage.attr("type", "button");
		// appending to container
		$("#buttonsCont").append(vImage);
	}
	
}

// submit click function
$("#submit").on("click", function(e){
	// prevent default form behavior
	e.preventDefault();
	// store input form value in variable
	var simpson = $("#inputSimpson").val().trim().toLowerCase();
	
	console.log(simpson);
	// turn button ON
	for(i = 0; i < simpsonsArray.length; i++) {
		if(simpson === simpsonsArray[i][0]) {
			simpsonsArray[i][1] = true;
		
			
			
		}
	}
	// empty input form
	$("#inputSimpson").val("");

	

	// calling function to render buttons
	renderButtons(simpson);
});

// adding event listener to all elem buttons
$(document).on("click", ".simpson", getGifs);
// calling function to render buttons
renderButtons();

