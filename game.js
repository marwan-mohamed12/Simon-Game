
var buttonColor = ["red", "blue", "green", "yellow"],
    gamePattern = [],
    userClickedPattern = [];

var level = 0,
    started = false;



$(document).keydown(function (event) {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});




$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("failed");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        } ,300)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();    
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}


function nextSequence() {
    userClickedPattern = [];

    var randNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColor[randNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).click(function () {
        playSound(randomChosenColor);
    }).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $("h1").text("Level " + level);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}





