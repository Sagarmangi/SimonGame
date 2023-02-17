
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// PLAY GAME
$(document).keypress(function () {
if (!started) {
    nextSequence();
    started = true;
  }
});




// GAME PATTERN

function nextSequence() {

  var randNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randNum];
  var colour = "#" + randomChosenColour;

  level++;
  $("h1").text("Level " + level);
  userClickedPattern.length = 0;

  gamePattern.push(randomChosenColour);

  $(colour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(colour);
}


// USER CLICK DETECTION

$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(this);
  checkAnswer(userClickedPattern.length-1);

})



// CHECKING ANSWER

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 250);
    startOver();
  }
}



// RESTARTING GAME

function startOver() {
  level = 0;
  gamePattern.length = 0;
  started = false;
}





// PLAYING SOUNDS

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}


// ANIMATING

function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function(){
    $(currentColour).removeClass("pressed");
  }, 100);
}
