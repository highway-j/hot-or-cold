$(document).ready(function(){

// SET DEFAULT VALUES
  var hint = {
              correct: "You guessed right!",
              closer: "Warmer",
              farther: "Colder",
              same: "Are you even trying?",
              redZone: "REDZONE",
              tryAgain: "Guess again!"
              };

	var chosen = Math.floor((Math.random() * 100) + 1);
	var guessCount = 0;
	$("#count").text(guessCount);
  var lastGuess;

  var removeHint = function(){
    $('#feedback p').remove(0);
  };

  var giveHint = function(hint){
    $('#feedback').append('<p>' + hint + '</p>');
  };

  var redZoneClass = function(){
    $('body').css('background-color', '#000000');
    $('html').css('background-color', '#FF0000');
  };

  var redZoneRemove = function(){
    $('body').css('background-color', '#1F253D');
    $('html').css('background-color', '#394264');
  };

  var winScreen = function(){
    $('#feedback').css('background-color', '#00ff00');
    $('html').css('background-color', '#00ff00');
  };

  var winRemove = function(){
    $('body').css('background-color', '#1F253D');
    $('html').css('background-color', '#394264');
  };

  var realGuesser = function(){
    realGuess = parseInt($('#userGuess').val());
    var guessRange = (Math.abs(realGuess - chosen));
    var previousRange = (Math.abs(lastGuess - chosen));
    if (realGuess >= 1 && realGuess <= 100) {
      if(realGuess === chosen){
          removeHint();
          giveHint(hint.correct);
          winScreen();
      } else if(guessRange > 50 || realGuess === lastGuess) {
          removeHint();
          giveHint(hint.same);
          redZoneRemove();
          winRemove();
      } else if(guessRange < previousRange && guessRange > 5){
          removeHint();
          giveHint(hint.closer);
          redZoneRemove();
          winRemove();
      } else if(guessRange > previousRange && guessRange > 5){
          removeHint();
          giveHint(hint.farther);
          redZoneRemove();
          winRemove();
      } else if(guessRange > 25 && guessRange < 50){
          removeHint();
          giveHint(hint.tryAgain);
          redZoneRemove();
          winRemove();
      } else if(guessRange < 5 && realGuess != chosen){
          removeHint();
          giveHint(hint.redZone);
          redZoneClass();
          winRemove();
      }
    } else {
      alert("You just wasted a guess! Enter a number between 1 - 100.");
    }
    lastGuess = realGuess;
  };
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	// New Game Function
  	var newGame = function(){
  		chosen = Math.floor((Math.random() * 100) + 1);
  		guessCount = 0;
		$("#count").text(guessCount);
    $('#feedback p').remove(0);
    $('input#userGuess').val('');
    $('#guessList li').remove();
    winRemove();
    redZoneRemove();
  	};

  	// Reset Game
  	$('.new').click(newGame);

    // Guess List Function
    var addGuess = function(){
      $('#guessList').append("<li>" + $('#userGuess').val() + "</li>");
    }


    // Run processor on click
    $('#guessButton').on('click', function(e){
      e.preventDefault();
      realGuesser();
      guessCount++;
      $("#count").text(guessCount);
      addGuess();
    });

    // Enter submits guess
    /* $('#userGuess').keydown(function(e) {
      if (e.keyCode == '13') {
        e.preventDefault();
        processor();
        // relative();
        guessCount++;
        $("#count").text(guessCount);
        addGuess();
      }
    }); */

});


