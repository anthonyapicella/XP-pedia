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

    console.log(sel)
    var monday = [];
    var tuesday = [];
    var wednesday = [];
    var thursday = [];
    var friday = [];
    var saturday = [];
    var sunday = [];

    for (var j = 0; j < sel.length; j++) {
        console.log(sel[j])
        
        var sleep = sel[0];
        var work = sel[1];
        var dependent = sel[2];
        var school = sel[3];
    }
    console.log(sleep);
    console.log(work);
    console.log(dependent);
    console.log(school);

    //I set it to 23 to automatically deduct eating and drinking time for the day
    monday = 23 - sleep - work - dependent - school;
    tuesday = 23 - sleep - work - dependent - school;
    wednesday = 23 - sleep - work - dependent - school;
    thursday = 23 - sleep - work - dependent - school;
    friday = 23 - sleep - work - dependent - school;
    saturday = 23 - sleep - dependent;
    sunday = 23 - sleep - dependent;
    
    $("#free-time-monday").text(monday + " hours");
    $("#free-time-tuesday").text(tuesday + " hours");
    $("#free-time-wednesday").text(wednesday + " hours");
    $("#free-time-thursday").text(thursday + " hours");
    $("#free-time-friday").text(friday + " hours");
    $("#free-time-saturday").text(saturday + " hours");
    $("#free-time-sunday").text(sunday + " hours");
   

    console.log(monday);
    console.log(tuesday);



})

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
                }
            }
        }
    })
})

//moments date
var today = moment();
$("#current-date").text(today.format("YYYY-MM-DD"));
$("#current-time").text(today.format("h:mm"))



