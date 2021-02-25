// function getApi() {
   
//     var baseUrl = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';
//     var apikey = '&api_key=9dabe6fca5474766befe65decab31101';
//     var requestUrl = baseUrl + apikey;

//     console.log(requestUrl)
    
//     fetch(requestUrl)
        
//       .then(function (response) {
//           console.log(response)
//           return response.json();

//       })



//       .then(function (data) {
//         console.log(data)
        
        
//     });
// }

// getApi();


// 9dabe6fca5474766befe65decab31101

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
})
.catch(err => {
	console.error(err);
});
