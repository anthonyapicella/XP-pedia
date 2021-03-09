var gameCard = $("#game-cards");
var currentGamePlayed = $("#user-current-game");
var usernameModal = $("#username-modal");
var submitDays = $("#submit-days")



//function to choose username - willreload page and display username
function chooseUsername () {
    if (localStorage.getItem("username") == null) {
        $("#username-modal").show();

        $("#save-username").on("click", function () {
            let username = $("#username").val();  
            localStorage.setItem("username", username);
            location.reload();
            $("#username-modal").hide()
            $(".close").on("click", function () {
                $("#username-modal").hide()
            })
        })        
    } else return;
}

chooseUsername()
$("#user-name").text(localStorage.getItem("username"))


//------------------------------calednar javascript-------------------------------------//

$(".current-day").text("Today is " + moment().format('dddd'));
// $("#time-left-today").text("End of day is " + moment().endOf('day').fromNow());



//using moment we calculate how much time we have left in the day and we dispaly it in a string//
var seperate = moment().endOf('day').fromNow().split(" ");
var timeLeft = $("#time-left").text(seperate[1] + " " + seperate[2] + " left to play video games");

//calculates tiem to beat in x amount of days
submitDays.on("click", function timeBeatGame() {
    // let timeLeft = seperate[1]
    var userCurrentGame = JSON.parse(localStorage.getItem("userGame"));
    var currentGameTime = userCurrentGame.gamePlayTime;
    var days = $("#days").val()

    timeToBeat = Math.round(currentGameTime / days);  
    
    localStorage.setItem("timeSpentperDay", timeToBeat);
    localStorage.setItem("days", days);

    console.log(currentGameTime)
    console.log(timeToBeat)

    $("#beat-game").text("If you spend " + timeToBeat + " hours per day playing \nthis game you will beat it in " + days + " days!")
    
})


displayStuff()

function displayStuff () {
    var timeStored = localStorage.getItem("timeSpentperDay")
    var daysStored = localStorage.getItem("days")
    if (localStorage.getItem("userGame") == null) {
        $("#beat-game").text("Please choose a Game")
    }
    
    if (localStorage.getItem("userGame") != null) {
        $("#beat-game").text("Enter number of days you want to spend beating this game")
    }
    
    if(localStorage.getItem("days") != null) {
        $("#beat-game").text("If you spend " + timeStored + " hours per day playing \nthis game you will beat it in " + daysStored + " days!")

    }

}


//variables for hours in day - minus the average time it takes to eat and drink


//this is our click event for our modal and what is ran when it appears.
$("#card-info-grab1").on("click", function(event) {
    event.preventDefault();
    $('#save-game').show()

    $(".btn-yes").on ("click", function () {
        localStorage.setItem("userGame", JSON.stringify(gameInfoStored))
        $('#save-game').hide();
        location.reload();
    })
    $(".btn-no").on ("click", function () {
        $('#save-game').hide();
    })
    $(".close").on ("click", function () {
        $('#save-game').hide()    
    })
})

//final value calculated here once the user checks their options and clicks the save button
$('#save_value').click(function() {

    //this variable checks all checkbox inputs if they are checked and returns their value
    var sel = $('input[type=checkbox]:checked').map(function(_, el) {
        return $(el).val();
    }).get();

    var total = 0;
    //loops through our checkboxes and adds the values to the total (values in html represent the hours per item)
    for (var i = 0; i < sel.length; i++) {
        total += sel[i] << 0;
    }
    var sleep = 0
    var work = 0
    var dependent = 0
    var school = 0

    if (total === 0) {
            $("#alert-modal").show()
            $("#modal-dismiss").on("click", function () {
                $('#alert-modal').hide();
            })
            $("#honesty-button").on("click", function () {
                $('#alert-modal').hide()    
            })
        } 

    if (sel.length){
        for (var j = 0; j < sel.length; j++) {

            if (sel[0]){
                sleep = sel[0];
            }
            if (sel[1]) {
                work = sel[1];
            }
            if(sel[2]){
                dependent = sel[2];
            }
            if(sel[3]){
                school = sel[3];
            }                
        }
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

    //this displays our free hours 
    $("#free-time-monday").text(monday + " hours");
    $("#free-time-tuesday").text(tuesday + " hours");
    $("#free-time-wednesday").text(wednesday + " hours");
    $("#free-time-thursday").text(thursday + " hours");
    $("#free-time-friday").text(friday + " hours");
    $("#free-time-saturday").text(saturday + " hours");
    $("#free-time-sunday").text(sunday + " hours");

})
//stored values being displayed willnot display anything if the values are empty in local storage
function displayHours() {
    if (localStorage.getItem("monday") != null ||
        localStorage.getItem("tuesday") != null ||
        localStorage.getItem("wednesday") != null ||
        localStorage.getItem("thursday") != null ||
        localStorage.getItem("friday") != null ||
        localStorage.getItem("saturday") != null ||
        localStorage.getItem("sunday") != null
        ){
            $("#free-time-monday").text(localStorage.getItem("monday") + " hours");
            $("#free-time-tuesday").text(localStorage.getItem("tuesday") + " hours");
            $("#free-time-wednesday").text(localStorage.getItem("wednesday") + " hours");
            $("#free-time-thursday").text(localStorage.getItem("thursday") + " hours");
            $("#free-time-friday").text(localStorage.getItem("friday") + " hours");
            $("#free-time-saturday").text(localStorage.getItem("saturday") + " hours");
            $("#free-time-sunday").text(localStorage.getItem("sunday") + " hours");
    } else return;
}

//calls displayHours function
displayHours()

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

//default platform selection
var platforms = ["18"];

//allows the user to select a platform
$("#platform-selection").on("click", function (event) {
    event.preventDefault();
    platforms = $("#platform-selection").val();
    console.log($("#platform-selection").val())
})

//grabs the game information that is searched for
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

                    //console log our search results
                    console.log(data.results[i].name);
                    console.log(data.results[i].playtime);
                    console.log(data.results[i].released);
                    console.log(data.results[i].background_image)

                    //this reloads the page
                    location.reload();
                }
            }
        }
    })
})

//global variables that grab stored search results for game the user is searching for
var gameNames = localStorage.getItem("gameNameStr").split(",");
var gamePlayTimes = localStorage.getItem("gameTimeStr").split(",");
var gameImages = localStorage.getItem("gameImageStr").split(",");
console.log(gameNames)

//each function will pull a card unless the string stored is empty or undefined
function card1 () {
    if (gameNames[0] === " " || gameImages[0] === " " || gamePlayTimes[0] === " ") {
        return;
    } else if (gameNames[0] === undefined || gameImages[0] === undefined || gamePlayTimes[0] === undefined) {
        return;
    } else

    var gameInfoStored = {
        gameName: gameNames[0],
        gamePlayTime: gamePlayTimes[0],
        gameImage: gameImages[0]
    }
    var displayRow = $("<div class='row my-5 card-display' id='card-info-grab1'></div>")
    var displayColumn1 = $("<div class='col-sm-3'></div>")
    var displayColumn2 = $("<div class='col-sm-9 fd-awy'></div>")
    var displaySearchResults1 = $("<div class='new-card'></div>")
    var displaySearchResults2 = $("<div class='new-card'></div>")
    var displayTitle = $("<h1 class='game-title-card'></h1>")
    var displayPlayTime = $("<h3 class='game-play-time' name='" + gameNames[0] + "'></h3>")
    var gameImage = $("<img id='game-image' src='" + gameImages[0] + "'>")

    displayTitle.text(gameNames[0])
    displayPlayTime.text(gamePlayTimes[0] + " hours to beat!")
    displaySearchResults1.append(gameImage)
    displaySearchResults2.append(displayTitle)
    displaySearchResults2.append(displayPlayTime)
    displayColumn1.append(displaySearchResults1)
    displayColumn2.append(displaySearchResults2)
    displayRow.append(displayColumn1)
    displayRow.append(displayColumn2)
    gameCard.append(displayRow)
    
    $("#card-info-grab1").on("click", function(event) {
        event.preventDefault();
        $('#save-game').show()

        $(".btn-yes").on ("click", function () {
            localStorage.setItem("userGame", JSON.stringify(gameInfoStored))
            $('#save-game').hide();
            location.reload();
        })
        $(".btn-no").on ("click", function () {
            $('#save-game').hide();
        })
        $(".close").on ("click", function () {
            $('#save-game').hide()    
        })
    })
}
function card2 () {
    if (gameNames[1] === " " || gameImages[1] === " " || gamePlayTimes[1] === " ") {
        return;
    } else if (gameNames[1] === undefined || gameImages[1] === undefined || gamePlayTimes[1] === undefined) {
        return;
    } else

    var gameInfoStored = {
        gameName: gameNames[1],
        gamePlayTime: gamePlayTimes[1],
        gameImage: gameImages[1]
    }
    var displayRow = $("<div class='row my-5 card-display' id='card-info-grab2'></div>");
    var displayColumn1 = $("<div class='col-sm-3'></div>");
    var displayColumn2 = $("<div class='col-sm-9 fd-awy'></div>");
    var displaySearchResults1 = $("<div class='new-card'></div>");
    var displaySearchResults2 = $("<div class='new-card'></div>");
    var displayTitle = $("<h1 class='game-title-card'></h1>");
    var displayPlayTime = $("<h3 class='game-play-time' name='" + gameNames[1] + "'></h3>");
    var gameImage = $("<img id='game-image' src='" + gameImages[1] + "'>");
    
    displayTitle.text(gameNames[1]);
    displayPlayTime.text(gamePlayTimes[1] + " hours to beat!");
    displaySearchResults1.append(gameImage);
    displaySearchResults2.append(displayTitle);
    displaySearchResults2.append(displayPlayTime);
    displayColumn1.append(displaySearchResults1);
    displayColumn2.append(displaySearchResults2);
    displayRow.append(displayColumn1);
    displayRow.append(displayColumn2);
    gameCard.append(displayRow)

    $("#card-info-grab2").on("click", function(event) {
        event.preventDefault();
        $('#save-game').show()

        $(".btn-yes").on ("click", function () {
            localStorage.setItem("userGame", JSON.stringify(gameInfoStored))
            $('#save-game').hide();
            location.reload();
        })
        $(".btn-no").on ("click", function () {
            $('#save-game').hide();
        })
        $(".close").on ("click", function () {
            $('#save-game').hide()    
        })
    })
}
function card3() {
    if (gameNames[2] === " " || gameImages[2] === " " || gamePlayTimes[2] === " ") {
        return;
    } else if (gameNames[2] === undefined || gameImages[2] === undefined || gamePlayTimes[2] === undefined) {
        return;
    } else

    var gameInfoStored = {
        gameName: gameNames[2],
        gamePlayTime: gamePlayTimes[2],
        gameImage: gameImages[2]
    }
    var displayRow = $("<div class='row my-5 card-display' id='card-info-grab3'></div>")
    var displayColumn1 = $("<div class='col-sm-3'></div>")
    var displayColumn2 = $("<div class='col-sm-9 fd-awy'></div>")
    var displaySearchResults1 = $("<div class='new-card'></div>")
    var displaySearchResults2 = $("<div class='new-card'></div>")
    var displayTitle = $("<h1 class='game-title-card'></h1>")
    var displayPlayTime = $("<h3 class='game-play-time' name='" + gameNames[2] + "'></h3>")
    var gameImage = $("<img id='game-image' src='" + gameImages[2] + "'>")

    displayTitle.text(gameNames[2])
    displayPlayTime.text(gamePlayTimes[2] + " hours to beat!")
    displaySearchResults1.append(gameImage)
    displaySearchResults2.append(displayTitle)
    displaySearchResults2.append(displayPlayTime)
    displayColumn1.append(displaySearchResults1)
    displayColumn2.append(displaySearchResults2)
    displayRow.append(displayColumn1)
    displayRow.append(displayColumn2)
    gameCard.append(displayRow)

    $("#card-info-grab3").on("click", function(event) {
        event.preventDefault();
        $('#save-game').show()

        $(".btn-yes").on ("click", function () {
            localStorage.setItem("userGame", JSON.stringify(gameInfoStored))
            $('#save-game').hide();
            location.reload();
        })
        $(".btn-no").on ("click", function () {
            $('#save-game').hide();
        })
        $(".close").on ("click", function () {
            $('#save-game').hide()    
        })
    })
    
}
function card4() {
    if (gameNames[3] === " " || gameImages[3] === " " || gamePlayTimes[3] === " ") {
        return;
    } else if (gameNames[3] === undefined || gameImages[3] === undefined || gamePlayTimes[3] === undefined) {
        return;
    } else

    var gameInfoStored = {
        gameName: gameNames[3],
        gamePlayTime: gamePlayTimes[3],
        gameImage: gameImages[3]
    }
    var displayRow = $("<div class='row my-5 card-display' id='card-info-grab4'></div>")
    var displayColumn1 = $("<div class='col-sm-3'></div>")
    var displayColumn2 = $("<div class='col-sm-9 fd-awy'></div>")
    var displaySearchResults1 = $("<div class='new-card'></div>")
    var displaySearchResults2 = $("<div class='new-card'></div>")
    var displayTitle = $("<h1 class='game-title-card justify-content-end'></h1>")
    var displayPlayTime = $("<h3 class='game-play-time' name='" + gameNames[3] + "'></h3>")
    var gameImage = $("<img id='game-image' src='" + gameImages[3] + "'>")

    displayTitle.text(gameNames[3])
    displayPlayTime.text(gamePlayTimes[3] + " hours to beat!")
    displaySearchResults1.append(gameImage)
    displaySearchResults2.append(displayTitle)
    displaySearchResults2.append(displayPlayTime)
    displayColumn1.append(displaySearchResults1)
    displayColumn2.append(displaySearchResults2)
    displayRow.append(displayColumn1)
    displayRow.append(displayColumn2)
    gameCard.append(displayRow)

    $("#card-info-grab4").on("click", function(event) {
        event.preventDefault();
        $('#save-game').show()

        $(".btn-yes").on ("click", function () {
            localStorage.setItem("userGame", JSON.stringify(gameInfoStored))
            $('#save-game').hide();
            location.reload();
        })
        $(".btn-no").on ("click", function () {
            $('#save-game').hide();
        })
        $(".close").on ("click", function () {
            $('#save-game').hide()    
        })
    })
}
function card5() {
    if (gameNames[4] === " " || gameImages[4] === " " || gamePlayTimes[4] === " ") {
        return;
    } else if (gameNames[4] === undefined || gameImages[4] === undefined || gamePlayTimes[4] === undefined) {
        return;
    } else

    var gameInfoStored = {
        gameName: gameNames[4],
        gamePlayTime: gamePlayTimes[4],
        gameImage: gameImages[4]
    }

    var displayRow = $("<div class='row my-5 card-display' id='card-info-grab5'></div>")
    var displayColumn1 = $("<div class='col-sm-3'></div>")
    var displayColumn2 = $("<div class='col-sm-9 fd-awy'></div>")
    var displaySearchResults1 = $("<div class='new-card'></div>")
    var displaySearchResults2 = $("<div class='new-card'></div>")
    var displayTitle = $("<h1 class='game-title-card'></h1>")
    var displayPlayTime = $("<h3 class='game-play-time' name='" + gameNames[4] + "'></h3>")
    var gameImage = $("<img id='game-image' src='" + gameImages[4] + "'>")

    displayTitle.text(gameNames[4])
    displayPlayTime.text(gamePlayTimes[4] + " hours to beat!")
    displaySearchResults1.append(gameImage)
    displaySearchResults2.append(displayTitle)
    displaySearchResults2.append(displayPlayTime)
    displayColumn1.append(displaySearchResults1)
    displayColumn2.append(displaySearchResults2)
    displayRow.append(displayColumn1)
    displayRow.append(displayColumn2)
    gameCard.append(displayRow)

    $("#card-info-grab5").on("click", function(event) {
        event.preventDefault();
        $('#save-game').show()

        $(".btn-yes").on ("click", function () {
            localStorage.setItem("userGame", JSON.stringify(gameInfoStored))
            $('#save-game').hide();
            location.reload();
        })
        $(".btn-no").on ("click", function () {
            $('#save-game').hide();
        })
        $(".close").on ("click", function () {
            $('#save-game').hide()    
        })
    })
}
function card6() {
    if (gameNames[5] === " " || gameImages[5] === " " || gamePlayTimes[5] === " ") {
        return;
    } else if (gameNames[5] === undefined || gameImages[5] === undefined || gamePlayTimes[5] === undefined) {
        return;
    } else

    var gameInfoStored = {
        gameName: gameNames[5],
        gamePlayTime: gamePlayTimes[5],
        gameImage: gameImages[5]
    }
 
    var displayRow = $("<div class='row my-5 card-display' id='card-info-grab6'></div>")
    var displayColumn1 = $("<div class='col-sm-3'></div>")
    var displayColumn2 = $("<div class='col-sm-9 fd-awy'></div>")
    var displaySearchResults1 = $("<div class='new-card'></div>")
    var displaySearchResults2 = $("<div class='new-card'></div>")
    var displayTitle = $("<h1 class='game-title-card'></h1>")
    var displayPlayTime = $("<h3 class='game-play-time' name='" + gameNames[5] + "'></h3>")
    var gameImage = $("<img id='game-image' src='" + gameImages[5] + "'>")

    displayTitle.text(gameNames[5])
    displayPlayTime.text(gamePlayTimes[5] + " hours to beat!")
    displaySearchResults1.append(gameImage)
    displaySearchResults2.append(displayTitle)
    displaySearchResults2.append(displayPlayTime)
    displayColumn1.append(displaySearchResults1)
    displayColumn2.append(displaySearchResults2)
    displayRow.append(displayColumn1)
    displayRow.append(displayColumn2)
    gameCard.append(displayRow)

    $("#card-info-grab6").on("click", function(event) {
        event.preventDefault();
        $('#save-game').show()

        $(".btn-yes").on ("click", function () {
            localStorage.setItem("userGame", JSON.stringify(gameInfoStored))
            $('#save-game').hide();
            location.reload();
        })
        $(".btn-no").on ("click", function () {
            $('#save-game').hide();
        })
        $(".close").on ("click", function () {
            $('#save-game').hide()    
        })
    })
}

//functions to display search results into cards called here
card1()
card2()
card3()
card4()
card5()
card6()


function userGame() {

    var userCurrentGame = JSON.parse(localStorage.getItem("userGame"));
 
    var displayRow = $("<div id='current-wrapper'></div>")
    var displayColumn1 = $("<div></div>")
    var displayColumn2 = $("<div></div>")
    var displaySearchResults1 = $("<div></div>")
    var displaySearchResults2 = $("<div></div>")
    var displayTitle = $("<h1 id='current-game-title'></h1>")
    var displayPlayTime = $("<h3 id='current-game-play-time'></h3>")
    var gameImage = $("<img id='current-game-image' src='" + userCurrentGame.gameImage + "'>")

    displayTitle.text(userCurrentGame.gameName)
    displayPlayTime.text(userCurrentGame.gamePlayTime + " hours to beat!")
    displaySearchResults1.append(gameImage)
    displaySearchResults2.append(displayTitle)
    displaySearchResults1.append(displayPlayTime)
    displayColumn2.append(displaySearchResults1)
    displayColumn1.append(displaySearchResults2)
    displayRow.append(displayColumn1)
    displayRow.append(displayColumn2)
    currentGamePlayed.append(displayRow)
}

//function that puts user game under user id
userGame();



var test = document.getElementById("platform-selection" );
 
// This handler will be executed only once when the cursor
// moves over the unordered list
test.addEventListener("mouseenter", function( event ) {
  // highlight the mouseenter target
  event.target.style.color = "red";

  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.color = "";
  }, 500);
}, false);

// This handler will be executed every time the cursor
// is moved over a different list item
test.addEventListener("mouseover", function( event ) {
  // highlight the mouseover target
  event.target.style.color = "red";

  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.color = "";
  }, 500);
}, false);


// function myFunction() {
//     document.getElementById("#game-cards").style.cssText = "display: flex; justify-content-end";
//     object.style.cssText.myFunction
//   }
 