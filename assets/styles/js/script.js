

var fullDay = 24;
console.log(fullDay);


//drop down click events for work
$("#no-work").on("click", function (event) {
    event.preventDefault();
    var workChoice = $("#no-work").text();
    console.log(workChoice);
})
$("#part-work").on("click", function (event) {
    var workChoice = $("#part-work").text();
    console.log(workChoice);
})
$("#full-work").on("click", function (event) {
    event.preventDefault();
    var workChoice = $("#full-work").text();
    console.log(workChoice);
})

//drop down click events for school
$("#no-school").on("click", function (event) {
    event.preventDefault();
    var schoolChoice = $("#no-school").text();
    console.log(schoolChoice);
})
$("#part-school").on("click", function (event) {
    var schoolChoice = $("#part-school").text();
    console.log(schoolChoice);
})
$("#full-school").on("click", function (event) {
    event.preventDefault();
    var schoolChoice = $("#full-school").text();
    console.log(schoolChoice);
})

//drop down click events for exercise
$("#no-exercise").on("click", function (event) {
    event.preventDefault();
    var exerciseChoice = $("#no-exercise").text();
    console.log(exerciseChoice)
})
$("#yes-exercise").on("click", function (event) {
    event.preventDefault();
    var exerciseChoice = $("#yes-exercise").text();
    fullDay = fullDay - 3;
    console.log(exerciseChoice)
    console.log(fullDay)
})
//drop down click events for dependents
$("#no-dependent").on("click", function (event) {
    event.preventDefault();
    var dependentChoice = $("#no-dependent").text();
    console.log(dependentChoice)
})
$("#yes-dependent").on("click", function (event) {
    event.preventDefault();
    var dependentChoice = $("#yes-dependent").text();
    fullDay = fullDay - .50;
    console.log(dependentChoice)
    console.log(fullDay)
})


var baseUrl = "https://rawg-video-games-database.p.rapidapi.com/games";

$("find-game").on("click", function(event) {
	event.preventDefault();

	var game = $("#game").val().trim();
	var query = baseUrl + "/" + game;


	
	fetch(query, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "053771b544msh062425a81420fa7p141f95jsn3af99f464143",
			"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com"
		}
	})
	.then(response => {
		console.log(response);
		return response.json();
	})
	.then(function (data) {
		console.log(data)
	})
	.catch(err => {
		console.error(err);
	});

})



fetch("https://rawg-video-games-database.p.rapidapi.com/games", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "053771b544msh062425a81420fa7p141f95jsn3af99f464143",
		"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
    return response.json();
})
.then(function (data) {
    console.log(data)

    for(var i = 0; i < data.results.length; i++) {
      
        console.log(data.results[i].name)
        console.log(data.results[i].playtime)
    }

    
    
})
.catch(err => {
	console.error(err);
});


// fetch("https://rawg-video-games-database.p.rapidapi.com/games/%7Bgame_pk%7D", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "053771b544msh062425a81420fa7p141f95jsn3af99f464143",
// 		"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// 	return response.json();
// })
// .then(function (data) {
//     console.log(data)
// })

// .catch(err => {
// 	console.error(err);
// });




var sleeping = 6.8;
var working = 8.5;
var travel = 1.11
var exercise = 30;
var eating = 1.8;

