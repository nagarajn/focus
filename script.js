(function () {
  ("use strict");
//   console.log("Hello");
 var calledPeriodicUpdate = false;
  $("#time-input")[0].value = 0;
//   console.log($("#time-input")[0].value);
  $("#time-input").on("input", function () {
    // console.log("You clicked", this.value);
    let minutes = parseInt(this.value);
    let seconds = (parseFloat(this.value) - parseInt(this.value)) * 60;
      updateSecondsAndMinutes(minutes, seconds);
      if (!calledPeriodicUpdate) {
          periodicUpdate();
      }
      calledPeriodicUpdate = true;
  });

  function periodicUpdate() {
  
      //update the count down in every 1 second
      let update = setInterval(function () {
        // console.log("update");
        let minutes = $("#minutes")[0].innerHTML;
        let seconds = $("#seconds")[0].innerHTML;
        // console.log("Seconds ", seconds, typeof seconds);
        
        if (minutes == "00" && seconds == "00") {
          clearInterval(update);
            // console.log("Done", typeof seconds);
            calledPeriodicUpdate = false;
        } else if (seconds != "00") {
          seconds = parseInt(seconds) - 1;
          minutes = parseInt(minutes);
          updateSecondsAndMinutes(minutes, seconds);
        } else if (seconds == "00") {
          seconds = parseInt("59");
          minutes = parseInt(minutes) - 1;
          updateSecondsAndMinutes(minutes, seconds);
        }
      }, 1000);
    
  }
  //Helper methods to update seconds and minutes
  //Input is seconds and minutes as numbers
  function updateSecondsAndMinutes(minutes, seconds) {
    $("#minutes")[0].innerHTML = ("00" + minutes).slice(-2);
    $("#seconds")[0].innerHTML = ("00" + seconds).slice(-2);
    $("#time-input")[0].value = minutes + seconds / 60;
  }
})();
