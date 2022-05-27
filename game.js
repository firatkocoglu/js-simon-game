var userClickedPattern = [];

var gamePattern = [];

var levelNumber = 0;

var gameOver = false;

var gameStarted = false;

var numberOfClicks = 0;

var buttonColours = ['red', 'blue', 'green', 'yellow'];

function nextSequence() {
  userClickedPattern = [];
  levelNumber++;
  $('#level-title').text('Level ' + levelNumber);
  randomValue = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomValue];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

$(document).on('keydown', function () {
  {
    if (!gameStarted) {
      $('#level-title').text('Level ' + levelNumber);
      nextSequence();
      gameStarted = true;
    }
  }
});

$('.btn').on('click', function () {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');
  setTimeout(() => {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}

function startOver() {
  levelNumber = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      if (!gameOver) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
  } else {
    console.log('wrong');
    wrongAudio = new Audio('sounds/wrong.mp3');
    wrongAudio.play();
    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}
