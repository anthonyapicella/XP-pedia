var gameCard = $("#game-cards")


//------------------------------calednar javascript-------------------------------------//

$(".current-day").text("Today is " + moment().format('dddd'));
// $("#time-left-today").text("End of day is " + moment().endOf('day').fromNow());

//using moment we calculate how much time we have left in the day and we dispaly it in a string//
var seperate = moment().endOf('day').fromNow().split(" ");
$("#time-left-today").text(seperate[1] + " " + seperate[2] + " left to play video games");

//variables for hours in day - minus the average time it takes to eat and drink



//------------------------------calednar javascript-------------------------------------//

//------- here is the added javascript for the newly added checkboxes -----------------------//

//final value calculated here once the user checks their options and clicks the save button
$('#save_value').click(function() {
    var sel = $('input[type=checkbox]:checked').map(function(_, el) {
        return $(el).val();
    }).get();
    console.log(sel)
    var total = 0;
    for (var i = 0; i < sel.length; i++) {
        total += sel[i] << 0;
        console.log(total)
    }
    //if the total (which is the amount of time spend NOT gaming) is greater than 24 hours --
    //it will display text
    if (total > 24) {
        $('#available-free-time').text("Fuggedaboutit!");
    } else {
        $("#available-free-time").text("Total Free Time " + (24 - total) + " hours!");
    };

    for (var j = 0; j < sel.length; j++) {
        console.log(sel[j])
        
        var sleep = sel[0];
        var work = sel[1];
        var dependent = sel[2];
        var school = sel[3];
    }

    //I set it to 23 to automatically deduct eating and drinking time for the day
    monday = 23 - sleep - work - dependent - school;
    tuesday = 23 - sleep - work - dependent - school;
    wednesday = 23 - sleep - work - dependent - school;
    thursday = 23 - sleep - work - dependent - school;
    friday = 23 - sleep - work - dependent - school;
    saturday = 23 - sleep - dependent;
    sunday = 23 - sleep - dependent;
    
    //sets our free time in local storage
    localStorage.setItem("monday", monday);
    localStorage.setItem("tuesday", tuesday);
    localStorage.setItem("wednesday", wednesday);
    localStorage.setItem("thursday", thursday);
    localStorage.setItem("friday", friday);
    localStorage.setItem("saturday", saturday);
    localStorage.setItem("sunday", sunday);
    
    //anytime the user updates their free time, the page will reload with the new times
    // location.reload();
})

//stored values being displayed
var mondayFreeTime = $("#free-time-monday").text(localStorage.getItem("monday") + " hours");
$("#free-time-tuesday").text(localStorage.getItem("tuesday") + " hours");
$("#free-time-wednesday").text(localStorage.getItem("wednesday") + " hours");
$("#free-time-thursday").text(localStorage.getItem("thursday") + " hours");
$("#free-time-friday").text(localStorage.getItem("friday") + " hours");
$("#free-time-saturday").text(localStorage.getItem("saturday") + " hours");
$("#free-time-sunday").text(localStorage.getItem("sunday") + " hours");

//this function makes sure only one box is checked at a time
$("input:checkbox").on('click', function() {
    var $box = $(this);
    if ($box.is(":checked")) {
      var group = "input:checkbox[name='" + $box.attr("name") + "']";
      $(group).prop("checked", false);
      $box.prop("checked", true);
    } else {
      $box.prop("checked", false);
    }
  });
//------- here is where the added javascript for the newly added checkboxes ends -----------------------//



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




            var gameNameStr = ' ';
            var playTimeStr = ' ';
            var gameImageStr = ' ';

            for (var i = 0; i < data.results.length; i++) {

                
                if (data.results[i].playtime > 0) {


                    //puts game names into string and stores into local storage
                    gameNameStr += data.results[i].name + ", ";
                    localStorage.setItem("gameNameStr", gameNameStr);
                    
                    //puts game play times into a string and stores it into local storage
                    playTimeStr += data.results[i].playtime + ", ";
                    localStorage.setItem("gameTimeStr", playTimeStr);

                    //puts our game images into a string
                    gameImageStr += data.results[i].background_image + ", ";
                    localStorage.setItem("gameImageStr", gameImageStr);

                    // console.log(gameNameStr)
                    // console.log(playTimeStr)
                    // console.log(gameImageStr)

                    
                    

                    console.log(data.results[i].name);
                    console.log(data.results[i].playtime);
                    console.log(data.results[i].released);
                    console.log(data.results[i].background_image)
                      
                    // var displayRow = $("<div class='row my-5' id='card-display'></div>");
                    // var displayColumn1 = $("<div class='col-sm-3'></div>")
                    // var displayColumn2 = $("<div class='col-sm-9'></div>")
                    // var displaySearchResults1 = $("<div class='new-card'></div>");
                    // var displaySearchResults2 = $("<div class='new-card'></div>");
                    // var displayTitle = $("<h1 class='game-title-card'></h1>");
                    // var displayPlayTime = $("<h3 class='game-play-time' name='" + data.results[i].playtime + "'></h3>");
                    // var gameImage = $("<img id='game-image' src='" + data.results[i].background_image + "'>");
                    
                    // displayTitle.text(data.results[i].name);
                    // displayPlayTime.text(data.results[i].playtime);
                    // displaySearchResults1.append(gameImage);
                    // displaySearchResults2.append(displayTitle);
                    // displaySearchResults2.append(displayPlayTime);
                    // displayColumn1.append(displaySearchResults1);
                    // displayColumn2.append(displaySearchResults2);
                    // displayRow.append(displayColumn1);
                    // displayRow.append(displayColumn2);
                    // gameCard.append(displayRow)

                    //this reloads the page
                    location.reload();
                }

            }
        }
    })
})

var gameNames = localStorage.getItem("gameNameStr").split(",");
var gamePlayTimes = localStorage.getItem("gameTimeStr").split(",");
var gameImages = localStorage.getItem("gameImageStr").split(",");

console.log(gameNames);
console.log(gamePlayTimes);
console.log(gameImage);

//loop through this

var x = "If you play for 1 hour a day it will take you "
 + gamePlayTimes[0] + " days to beat";
console.log(x)



for (var i = 0; i < gameNames.length; i++) {
    console.log(gameNames[i])
}
var displayRow = $("<div class='row my-5' id='card-display'></div>");
var displayColumn1 = $("<div class='col-sm-3'></div>");
var displayColumn2 = $("<div class='col-sm-9'></div>");
var displaySearchResults1 = $("<div class='new-card'></div>");
var displaySearchResults2 = $("<div class='new-card'></div>");
var displayTitle = $("<h1 class='game-title-card'></h1>");
var displayPlayTime = $("<h3 class='game-play-time' name='" + gameNames[0] + "'></h3>");
var gameImage = $("<img id='game-image' src='" + gameImages[0] + "'>");

displayTitle.text(gameNames[0]);
displayPlayTime.text(gamePlayTimes[0]);
displaySearchResults1.append(gameImage);
displaySearchResults2.append(displayTitle);
displaySearchResults2.append(displayPlayTime);
displayColumn1.append(displaySearchResults1);
displayColumn2.append(displaySearchResults2);
displayRow.append(displayColumn1);
displayRow.append(displayColumn2);
gameCard.append(displayRow)

var displayRow = $("<div class='row my-5' id='card-display'></div>");
var displayColumn1 = $("<div class='col-sm-3'></div>");
var displayColumn2 = $("<div class='col-sm-9'></div>");
var displaySearchResults1 = $("<div class='new-card'></div>");
var displaySearchResults2 = $("<div class='new-card'></div>");
var displayTitle = $("<h1 class='game-title-card'></h1>");
var displayPlayTime = $("<h3 class='game-play-time' name='" + gameNames[1] + "'></h3>");
var gameImage = $("<img id='game-image' src='" + gameImages[1] + "'>");

displayTitle.text(gameNames[1]);
displayPlayTime.text(gamePlayTimes[1]);
displaySearchResults1.append(gameImage);
displaySearchResults2.append(displayTitle);
displaySearchResults2.append(displayPlayTime);
displayColumn1.append(displaySearchResults1);
displayColumn2.append(displaySearchResults2);
displayRow.append(displayColumn1);
displayRow.append(displayColumn2);
gameCard.append(displayRow)


console.log(gameNames[0]);
console.log(gamePlayTimes[0]);
console.log(gameImages[0])





//moments date
var today = moment();
$("#current-date").text(today.format("YYYY-MM-DD"));
$("#current-time").text(today.format("h:mm"))



