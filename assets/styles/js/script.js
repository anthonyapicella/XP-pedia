// // function getApi() {
   
// //     var baseUrl = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';
// //     var apikey = '&api_key=9dabe6fca5474766befe65decab31101';
// //     var requestUrl = baseUrl + apikey;

// //     console.log(requestUrl)
    
// //     fetch(requestUrl)
        
// //       .then(function (response) {
// //           console.log(response)
// //           return response.json();

// //       })



// //       .then(function (data) {
// //         console.log(data)
        
        
// //     });
// // }

// // getApi();


// // 9dabe6fca5474766befe65decab31101

// fetch("https://rawg-video-games-database.p.rapidapi.com/games", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "053771b544msh062425a81420fa7p141f95jsn3af99f464143",
// 		"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
//     return response.json();
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


// function workTime(sleeping){
// 	console.time(workTime)

// }
// <script>
//     function getDateDifference(startDate, endDate) {
//       if (startDate > endDate) {
//         console.error('Start date must be before end date');
//         return null;
//       }
//       var startYear = startDate.getFullYear();
//       var startMonth = startDate.getMonth();
//       var startDay = startDate.getDate();

//       var endYear = endDate.getFullYear();
//       var endMonth = endDate.getMonth();
//       var endDay = endDate.getDate();

//       var february = (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
//       var daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//       var startDateNotPassedInEndYear = (endMonth < startMonth) || endMonth == startMonth && endDay < startDay;
//       var years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);

//       var months = (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;

//       var days = startDay <= endDay ? endDay - startDay : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;

//       return {
//         years: years,
//         months: months,
//         days: days
//       };
//     }

//     var result = getDateDifference(new Date("2018-01-01"), new Date("2019-01-02"));

//     //Print in console array with value
//     console.log(result);

//     var text = result.years+" year, "+result.months+" month, "+result.days+" days";
//     alert(text);
// </script>