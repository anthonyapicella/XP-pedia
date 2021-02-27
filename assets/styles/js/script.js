//variables for time reduction (per day)

// true for everyone
// var sleeping = 6.8;
// var eating = 1.8;

// $('select').selectpicker();


var eatSleep = 8

// if any of the following are true then travel hours are true
var workingFullTime = 8.5;
var workingPartTime = 4;
var schoolFullTime = 8;
var schoolPartTime = 4;
var dependentCare = 1.5;
var exercise = .5;
var travel = 1;

var gameCard = $("#game-cards")

// added variable myDay to later subtract a 'fullDay'
var fullDay = 24;
var myDay = 24;

$(".class").html = "test";


//drop down click events for work
$("#no-work").on("click", function (event) {
    event.preventDefault();
    var workChoice = $("#no-work").text();
    console.log(workChoice);
    console.log(myDay);
})
$("#part-work").on("click", function (event) {
    event.preventDefault();
    var workChoice = $("#part-work").text();
    myDay = myDay - 4;
    console.log(workChoice);
    console.log(myDay);
})
$("#full-work").on("click", function (event) {
    event.preventDefault();
    var workChoice = $("#full-work").text();
    myDay = myDay - 8;
    console.log(workChoice);
    console.log(myDay);
})

//drop down click events for school
$("#no-school").on("click", function (event) {
    event.preventDefault();
    var schoolChoice = $("#no-school").text();
    console.log(schoolChoice);
    console.log(myDay);
})
$("#part-school").on("click", function (event) {
    event.preventDefault();
    var schoolChoice = $("#part-school").text();
    myDay = myDay - 4;
    console.log(schoolChoice);
    console.log(myDay);
})
$("#full-school").on("click", function (event) {
    event.preventDefault();
    var schoolChoice = $("#full-school").text();
    myDay = myDay - 8;
    console.log(schoolChoice);
    console.log(myDay);
})

//drop down click events for exercise
$("#no-exercise").on("click", function (event) {
    event.preventDefault();
    var exerciseChoice = $("#no-exercise").text();
    console.log(exerciseChoice);
    console.log(myDay);
})
$("#yes-exercise").on("click", function (event) {
    event.preventDefault();
    var exerciseChoice = $("#yes-exercise").text();
    myDay = myDay - 3;
    console.log(exerciseChoice);
    console.log(myDay);
})
//drop down click events for dependents
$("#no-dependent").on("click", function (event) {
    event.preventDefault();
    var dependentChoice = $("#no-dependent").text();
    console.log(dependentChoice);
    console.log(myDay);
    

})
$("#yes-dependent").on("click", function (event) {
    event.preventDefault();
    var dependentChoice = $("#yes-dependent").text();
    myDay = myDay - 2;
    console.log(dependentChoice);
    console.log(myDay);
})


// on click, subtract eatSleep form myDay and return free hours, else return "Fuggedaboutit!"

$("#time-left").on("click", function () {
    // event.preventDefault();
    myDay =  myDay -  eatSleep;
    if (myDay < 16) {
        myDay = (myDay - travel)
    };
    console.log(myDay);
    if (myDay >= 1) {
        return $('#free-time').text(myDay);
    } else {
        return $('#free-time').text("Fuggedaboutit!");
    };
      
})

//platforms default selected to ps4
var platforms = ["18"];

$("#platform-selection").on("click", function (event) {
    event.preventDefault();

    platforms = $("#platform-selection").val();

    console.log($("#platform-selection").val())
})


function getGameAPI(searchTerm) {
    //joins are platforms selection
    var platformsJoined = platforms.join(",");

    var baseUrl = "https://rawg-video-games-database.p.rapidapi.com/games";
    var query = baseUrl + "?search=" + searchTerm + "&page_size=100&search_exact=true&platforms=" + platformsJoined;
    // var query = baseUrl
    //we now limit search terms to 5
    console.log(query)
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
	var game = $("#search-game").val().split(" ").join("-");
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
                if (data.results[i].playtime > 0) {
                    console.log(data.results[i].name);
                    console.log(data.results[i].playtime);
                    console.log(data.results[i].released);

                    console.log(data.results[i].background_image)
                    
                    
                    var displayRow = $("<div class='row my-5' id='card-display'></div>");
        
                    var displayColumn1 = $("<div class='col-sm-3'></div>")
                    var displayColumn2 = $("<div class='col-sm-9'></div>")
                    var displaySearchResults1 = $("<div class='new-card'></div>");
                    var displaySearchResults2 = $("<div class='new-card'></div>");
                    var displayTitle = $("<h1 class='game-title-card'></h1>");
                    var displayPlayTime = $("<h3 class='game-play-time'></h3>");
                    var gameImage = $("<img id='game-image' src='" + data.results[i].background_image + "'>");
                    displayTitle.text(data.results[i].name);
                    //added more text to display play time
                    displayPlayTime.text("Finish game in " + data.results[i].playtime + " hours");
                    displaySearchResults1.append(gameImage);
                    console.log(displaySearchResults1)
                    displaySearchResults2.append(displayTitle);
                    displaySearchResults2.append(displayPlayTime);
                    displayColumn1.append(displaySearchResults1);
                    console.log(displayColumn1)
                    displayColumn2.append(displaySearchResults2);
                    displayRow.append(displayColumn1);
                    displayRow.append(displayColumn2);
                    
        
                    gameCard.append(displayRow)
                    console.log(displayRow)
                    // $(".new-card").append(displayTitle);
                    // $(".new-card").append(displayPlayTime);
                    // $(".new-card").append(gameImage);
    



                }
                
                

            }
        }
    })
    // .catch(function(err) {
    //     console.error(err)
    // })
})


var today = moment();
$("#current-date").text(today.format("YYYY-MM-DD"));
$("#current-time").text(today.format("h:mm"))



