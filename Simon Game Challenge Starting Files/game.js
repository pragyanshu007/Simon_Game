//alert("hello motherfucker");




var userClickedPattern = [];
var compPattern  = [];
var level = 0;
var started = false;

//$("#level-title").text("Level " + level);

$(document).keypress(function() {
    if(!started){
      userClickedPattern = [];
      compPattern = [];
      nextSeq();
      started = true;
    }
  });

function checkAns(){
  var y = userClickedPattern.length
  if(userClickedPattern[y-1] == compPattern[y-1]){
    if(y<level){
      return 1;
    }
    else{
      console.log("You Advances To Next Level");
      return 2;
    }
  }
  else{
    $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    return 0;
  }
}



function animatePress(clickedId){
  $("#" + clickedId).addClass("pressed");
  setTimeout(function () {
    $("#" + clickedId).removeClass("pressed");
  }, 100);
}

function playSound(clickedId){
    var audio = new Audio("sounds/" + clickedId + ".mp3");
    audio.play();
}

function nextSeq(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);

  var n = Math.random();
  n = n*4;
  n = Math.floor(n);
  if(n == 0){
    $("#green").fadeIn(100).fadeOut(100).fadeIn(100);
    playSound("green");
    compPattern.push("green");
    //animatePress("green");
  }
  else if(n == 1){
    $("#red").fadeIn(100).fadeOut(100).fadeIn(100);
    playSound("red");
    compPattern.push("red");
    //animatePress("red");
  }
  else if(n == 2){
    $("#yellow").fadeIn(100).fadeOut(100).fadeIn(100);
    playSound("yellow");
    compPattern.push("yellow");
    //animatePress("yellow");
  }
  else{
    $("#blue").fadeIn(100).fadeOut(100).fadeIn(100);
    playSound("blue");
    compPattern.push("blue");
    //animatePress("blue");
  }

}



$(".btn").click(function() {

      var clickedId = $(this).attr("id");
      //alert(clickedId);
      userClickedPattern.push(clickedId);
      playSound(clickedId);
      animatePress(clickedId);
      if(started){
        var x = checkAns();

        if(x == 0){
          userClickedPattern = [];
          compPattern = [];
          level = 0;
          started = false;
          $("h1").text("Game Over ! Press New Key to Start");
        }

        else if(x == 2){
          setTimeout(function () {
            nextSeq();
          }, 1000);
        }
      }
  });
