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