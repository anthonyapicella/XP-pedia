//variables for time reduction
var sleeping = 6.8;
var working = 8.5;
var travel = 1.11
var exercise = 30;
var eating = 1.8;



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



function getGameAPI(searchTerm) {
    var baseUrl = "https://rawg-video-games-database.p.rapidapi.com/games";
    var query = baseUrl + "?search=" + searchTerm + "&page_size=5";
    //we now limit serach terms to 5
    
    return fetch(query, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "053771b544msh062425a81420fa7p141f95jsn3af99f464143",
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com"
        }
    });
}

// f(x) = x + 2
//x would be the parameter
// f(borderlands3) = borderlands3 + 2

$("#find-game").on("click", function(event) {
	event.preventDefault();
	var game = $("#game").val().split(" ").join("-");
    getGameAPI(game)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        if(data.redirect) {
            console.log('first condition triggered')
            getGameAPI(data.slug)
            .then(function(response) {
                return response.json();
            })
            .then(function(data1) {
                console.log(data1);
            });
        } else {
            console.log('else condition triggered')
            console.log(data)

            for (var i = 0; i < data.results.length; i++) {
            console.log(data.results[i].name)
            console.log(data.results[i].playtime);
            }
        }
    })

    .catch(function(err) {
        console.error(err)
    })
})	
