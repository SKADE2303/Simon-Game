var buttonColors =['red' , 'green' , 'blue','yellow'];
var gamePattern=[];
var userchosencolor=[];
var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userchosencolor = [];
    level++;
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    
}

$(".btn").click(function(index){
    var userChosenColour = $(this).attr("id");
    userchosencolor.push(userChosenColour);
    var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    audio.play();
    animatePress(userChosenColour);
    
    checkAnswer(userchosencolor.length-1);
})

function animatePress(userChosenColour){
 //   var buttonClicked= "#"+userChosenColour;
    $("#"+userChosenColour).addClass("pressed");
    setTimeout(function() {$("#"+userChosenColour).removeClass("pressed");},100);
    
}

function checkAnswer(index){
    if(userchosencolor[index]===gamePattern[index]){
       console.log("correct");
        if(userchosencolor.length===gamePattern.length){
            setTimeout(function(){nextSequence();},1000);
        }
        
    }
    else{
        console.log("wrong");
        var audio= new Audio("sounds/wrong.mp3");
        audio.play();    
        $("h1").text("Game Over,press a key to start again");
        $("body").addClass("game-over");
        setTimeout(function(){ $("body").removeClass("game-over")},100);

            startover();
        
       
    }
    
    return false;
}

function startover(){
    level=0;
    gamePattern=[];
    started=false;
}
