var btnArr = ["dog", "cat", "horse", "mouse", "zebra", "monkey", "panda", "fish", "shrimp", "shark",
				"dolphin", "bird", "sheep", "turtle", "lion", "tiger", "elephant", "cheetah", 
				"gorilla", "longhorn"];




$(document).ready(function(){

	makeBtn();

	function makeBtn() {
		$("#button-display").empty();

		for (var a = 0; a < btnArr.length; a++){
			var newBtn = $("<button>");

			newBtn.addClass("btn btn-default animalBtn").text(btnArr[a]).data("name", btnArr[a]);

			$("#button-display").append(newBtn);

		}
	}

	$("#submitBtn").on("click", function(event){

		event.preventDefault();

		var animalInput = $("#searchText").val().trim();

		btnArr.push(animalInput);



		makeBtn();
	})

	$(document).on("click", ".animalBtn", function() {
		$("#gif-display").empty();
		$("#gifText").empty();
		$(".body").css({"background-size": "100% 100%"});

		var gifText = $("<h2>").text("Click on an image for some magic!");

		$("#gifText").append(gifText);

		var animalName = $(this).data("name");

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response) {
			var results = response.data;

			console.log(results);

			for (var b = 0; b < results.length; b++) {
				var gifDiv = $("<div class = 'gifDiv'>");

				

				var rating = results[b].rating;

				var p = $("<p>").text("Rating: " + rating);

				var animalImage = $("<img>");

				animalImage.attr("src", results[b].images.fixed_height_still.url);
				animalImage.attr("data-still", results[b].images.fixed_height_still.url);
				animalImage.attr("data-animate", results[b].images.fixed_height.url);
				animalImage.attr("data-state", "still");
				animalImage.addClass("gifs");
				

				gifDiv.append(p);
				gifDiv.append(animalImage);

				$("#gif-display").prepend(gifDiv);
			}
		})
	})
	$(document).on("click", ".gifs", function() {
			var state = $(this).attr("data-state");
				if (state === "still") {
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate");
				}
				else{
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still");
				}
			})
})
