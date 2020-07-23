var weeks = [];

var daysName = [];

var currentDate = new Date();

var monthName = '';

daysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

Date.prototype.daysInMonth = function()
{
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
}


function refreshDays(d)
{
  var currentDate = d;
  
    var days = [];
   splittedCurrentDate = d.toDateString().split(' ');
   var month = splittedCurrentDate[1];
   var today = splittedCurrentDate[2];


   $('.month').html('');
   $('.month').append('<b>' + month + '</b>');

   var daysCount = new Date().daysInMonth();


  for(var i = 1; i <= daysCount; ++i)
  {
      var currentDay;

      if(i <= today)
      {
        currentDay = currentDate.getDate() - (today- i);
      }
      else
      {
          currentDay = currentDate.getDate() + (i - today);
      }
       
    var datebyday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay);

    var day = datebyday.toLocaleString('en', {
        month: 'long',
        day: 'numeric',
        weekday: 'long'  
      });

      var dayData = day.split(' ');
      days.push({ day: dayData[2],
                  weekday : dayData[0].replace(',','')});
  }
  
  displayDays(days);
}

function displayDays(days)
{
  weeks = $('.week');

  var start = firstDayIndex(days[0]);

  var dayNumber = 0;

  for(var i = 0; i < weeks.length; ++i)
  {
    for(var k = 0; k < 7; ++k)
    {
      if(k < start)
      {
        var newday = document.createElement("div");
        newday.className ="day";
        newday.innerText=" ";
        weeks[i].append(newday);
      }
      else
      {
        var newday = document.createElement("div");
        newday.className ="day";
        newday.innerText= days[dayNumber].day;
        newday.style = 
           (days[dayNumber].weekday == "Saturday" || days[dayNumber].weekday == "Sunday")
            ?  "color: red" : "color: black";


        weeks[i].append(newday);
        start = 0;
        dayNumber++;
        if(dayNumber >= days.length)
        {
          return;
        }
      }
    }
  }
}

function firstDayIndex(firstDay)
{
   for(var i = 0; i < daysName.length; ++i)
   {
     if(firstDay.weekday == daysName[i])
     {
       return i;
     }
   }
}

function init()
{
  refreshDays(currentDate);
}

function clear()
{
  $('.day').remove();
}


$(document).ready(function($){

  $(".prev").on("click", function() {
    clear();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    refreshDays(currentDate);
  });

  $(".next").on("click", function() {
    clear();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    refreshDays(currentDate);
  });

  $('.todayIs').append('<i>'+ currentDate + '</i>');
  for(var i = 0; i < daysName.length; ++i)
  {
      $('.daysBar').append('<p>' + daysName[i] + '</p>');
  }
  
  init();
});