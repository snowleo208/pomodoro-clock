function startTimer () {
  var p = "Session"; //set session or break
  var breakTime = 5; //default value
  var sessionTime = 25;
  var flag = null; //null for reset settings, true if click once, false will stop countdown
  document.getElementById("breakTime").innerHTML = breakTime;
  document.getElementById("sessionTime").innerHTML = sessionTime;
  
  function forBothTime (time) {
    var newMin = time * 60 * 1000; //calculate time in millisecond
    var newTime = newMin;
    var minutes = Math.floor((newMin % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((newMin % (1000 * 60)) / 1000);
  
$( "#timer" ).click(function() {
  if (flag == true) {
    flag = false;
  } else if (flag == false) {
    flag = true;
  } else {
    flag = null;
    if (p =="Session") {
      newMin = sessionTime * 60 * 1000; //reset time if flag is null
      newTime = newMin;
    } else if (p =="Break") {
      newMin = breakTime * 60 * 1000; //reset time if flag is null
      newTime = newMin;
    }
  }
  
  function countDownTimer () {
      newMin -= 1000;//start deducting
      minutes = Math.floor((newMin % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((newMin % (1000 * 60)) / 1000);
      var percentage = ((newTime - newMin) / newTime) * 100;

    if (p == "Session") {
      $("#timer").css('background', 'linear-gradient(to top, #ff99cc '+ percentage +'%,#FFFFFF ' + percentage + '%)'); //session bg color
    } else if (p == "Break") {
      $("#timer").css('background', 'linear-gradient(to top, #CCFF99 '+ percentage +'%,#FFFFFF ' + percentage + '%)'); //break bg color
    }
    
    
      $("#timerText").html(p + " | " + minutes + ":" + seconds);

      $('#timer').on('click', function(){
        clearInterval(x); //clear counting if click
      });
    
    if (newMin == 0) {
      //restart counting after complete
      if (p == "Session") {
        p = "Break";
        newMin = breakTime * 60 * 1000;
        $("#timerText").html(p + " | " + minutes + ":" + seconds);
      } else if (p == "Break") {
        newMin = sessionTime * 60 * 1000;
        p = "Session";
        $("#timerText").html(p + " | " + minutes + ":" + seconds);
      }
    }
    
    }
  
  if (x == undefined && newMin > 0 && flag !== false) {
    var x = setInterval(function() {countDownTimer()}, 1000);
    return flag = true;
  }

});
}

  function clickSession (event) {
  if (typeof x !== undefined && flag == null | flag == false) {
    //only null and timer not set & timer stopped will activate event
    switch (event) {
    case "session_add":
      if (sessionTime < 60) {
        if (flag == null | p == "Session") {
        sessionTime += 1;
		    document.getElementById("sessionTime").innerHTML = sessionTime;
        document.getElementById("timerText").innerHTML = "Session: " + sessionTime + " minute(s)";
        }
      }
        break;
    case "session_deduct":
      if (sessionTime > 1) {
        if (flag == null | p == "Session") {
          sessionTime--;
		      document.getElementById("sessionTime").innerHTML = sessionTime;
          document.getElementById("timerText").innerHTML = "Session: " + sessionTime + " minute(s)";
        }
      }
        break;
    case "break_add":
      if (breakTime < 60) {
        if (flag == null | p == "Break") {
          breakTime++;
          document.getElementById("breakTime").innerHTML = breakTime;
          document.getElementById("timerText").innerHTML = "Break: " + breakTime + " minute(s)";
        }
       }
        break;
    case "break_deduct":
        if (breakTime > 1) {
          if (flag == null | p == "Break") {
            breakTime --;
            document.getElementById("breakTime").innerHTML = breakTime;
            document.getElementById("timerText").innerHTML = "Break: " + breakTime + " minute(s)";
            }
        }
        break;
    }
  } else {return true;} //if time is running, do nothing and returm true
    
    var currentSession = p;
    if (flag == false && event.indexOf(currentSession.toLowerCase()) < 0)
      {flag == false;} else {flag = null;}
}

  $('.timebtn').on('click', function(e){
    clickSession(e.target.id);  //add or deduct break time and session time
});
 if (p == "Session") {
   forBothTime(sessionTime);
 } else if (p == "Break") {
   forBothTime(breakTime);
 }
  
}

document.addEventListener("DOMContentLoaded", function(){
	startTimer();
});
