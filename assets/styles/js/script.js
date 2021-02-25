// $(document).ready(function() {    
//     function calculateTime() {
//             //get values
//             var valuestart = $("select[name='timestart']").val();
//             var valuestop = $("select[name='timestop']").val();
              
//              //create date format          
//              var timeStart = new Date("01/01/2007 " + valuestart);
//              var timeEnd = new Date("01/01/2007 " + valuestop);
             
//              var difference = timeEnd - timeStart;             
//              var diff_result = new Date(difference);    
             
//              var hourDiff = diff_result.getHours();
    
            
//              $("p").html("<b>Hour Difference:</b> " + hourDiff )             
             
//     }
//     $("select").change(calculateTime);
//     calculateTime();
//     });

//     var valuestart = $("select[name='timestart']").val();
// var valuestop = $("select[name='timestop']").val();

// //create date format          
// var timeStart = new Date("01/01/2007 " + valuestart).getHours();
// var timeEnd = new Date("01/01/2007 " + valuestop).getHours();

// var hourDiff = timeEnd - timeStart;  


var date = new Date("'December 17, 1995");

//Add two hours
date.setHours(date.getHours() + 2);

//Go back 3 days
date.setDate(date.getDate() - 3);

//One minute ago...
date.setMinutes(date.getMinutes() - 1);

var today = new Date()
var birthday = new Date('December 17, 1995 03:24:00')
var birthday = new Date('1995-12-17T03:24:00')
var birthday = new Date(1995, 11, 17)            // the month is 0-indexed
var birthday = new Date(1995, 11, 17, 3, 24, 0)
var birthday = new Date(628021800000)   