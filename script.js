(function () {
  ("use strict");
  //   console.log("Hello");
  var calledPeriodicUpdate = false;
  const niceColors = [
    "#e6194b",
    "#3cb44b",
    "#ffe119",
    "#4363d8",
    "#f58231",
    "#911eb4",
    "#46f0f0",
    "#f032e6",
    "#bcf60c",
    "#fabebe",
    "#008080",
    "#e6beff",
    "#9a6324",
    "#fffac8",
    "#800000",
    "#aaffc3",
    "#808000",
    "#ffd8b1",
    "#000075",
    "#808080",
    "#ffffff",
    "#000000",
  ];
  var startTime = new Date().getTime();
  var timerMaxTime;
  //Set the background color of the timer to a random color
  //at the beginning
  $(".container").css("background-color", pickRandomColor(niceColors));
  $(".container").css(
    "background-color",
    color2Rgba($(".container").css("background-color"))
  );

  $("#time-input")[0].value = 0;
  //   console.log($("#time-input")[0].value);
  $("#time-input").on("input", function () {
    // console.log("You clicked", this.value);
    startTime = new Date().getTime();
    startTime = Math.round(startTime / 1000);
    let minutes = parseInt(this.value);
    let seconds = (parseFloat(this.value) - parseInt(this.value)) * 60;
    timerMaxTime = minutes * 60 + seconds;
    updateSecondsAndMinutes(minutes, seconds);
    if (!calledPeriodicUpdate) {
      periodicUpdate();
    }
    calledPeriodicUpdate = true;
  });

  function periodicUpdate() {
    //update the count down in every 1 second
    let update = setInterval(function () {
      currTime = new Date().getTime();
      currTime = Math.round(currTime / 1000);
      let elapsedTime = currTime - startTime;
      let remainingTime = timerMaxTime - elapsedTime;
      // console.log(elapsedTime, timerMaxTime, remainingTime);
      // console.log("update");
      let minutes = "";
      let seconds = "";
      if (remainingTime <= 0) {
        minutes = "00";
        seconds = "00";
      } else {
        minutes = Math.floor(remainingTime / 60);
        seconds = remainingTime % 60;
      }
      // console.log("Seconds ", seconds, "minutes", minutes);

      if (minutes == "00" && seconds == "00") {
        updateSecondsAndMinutes(minutes, seconds);
        clearInterval(update);
        // console.log("Done", typeof seconds);
        calledPeriodicUpdate = false;
      } else {
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
  // console.log($(".color-picker-wrapper"));
  for (let i = 0; i < 20; i++) {
    $(".color-picker-wrapper").append(
      "<div class='color-picker' style='background-color:" +
        niceColors[i] +
        "'></div>"
    );
  }
  $(".color-picker").on("click", function () {
    let color = $(this).css("background-color");
    let rgba = color2Rgba(color);
    $(".container").css("background-color", rgba);
  });
  //Given a color, convert it to rgba
  function color2Rgba(color) {
    rgba = color.replace("rgb", "rgba");
    rgba = rgba.replace(")", ", 0.25)");
    return rgba;
  }
  //Pick a random color from the list of colors
  function pickRandomColor(niceColors) {
    return niceColors[Math.floor(Math.random() * niceColors.length)];
  }
})();
