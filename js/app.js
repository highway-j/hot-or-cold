$(document).ready(function(){

  alert("Hey Rupesh, I can't seem to get my relative feedback function to work. Could you look into that for me? Also, somehow my keydown function for pressing Enter is running even though I commented it out. The alerts were popping up twice before this.")

	// Pick Random Number 1-100, Set default values
	var chosen = Math.floor((Math.random() * 100) + 1);
	var guessCount = 0;
	$("#count").text(guessCount);
	
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
  		chosen = Math.random(1, 101);
  		guessCount = 0;
		$("#count").text(guessCount);
    $('#feedback p').remove(0);
    $('input#userGuess').val('');
    $('#guessList li').remove();
  	};

  	// Reset Game
  	$('.new').click(newGame);

    // Guess List Function
    var addGuess = function(){
      $('#guessList').append("<li>" + $('#userGuess').val() + "</li>");
    }

  	// Guess Processor
  	var processor = function() {
  		var guess = parseInt($("#userGuess").val());
  		if (guess >= 1 && guess <= 100) {
  			if (guess === chosen) {
          $('#feedback p').remove(0);
  				$('#feedback').append("<p>You guessed right!</p>");
        } else if (Math.abs(guess - chosen) >= 99) {
          $('#feedback p').remove(0);
          $('#feedback').append("<p>Are you even trying?</p>");
  			} else if (Math.abs(guess - chosen) > 75) {
          $('#feedback p').remove(0);
          $('#feedback').append("<p>It's freezing in here!</p>");
        } else if (Math.abs(guess - chosen) > 50) {
          $('#feedback p').remove(0);
  				$('#feedback').append("<p>You're as cold as ice!</p>");
  			} else if (Math.abs(guess - chosen) > 25) {
          $('#feedback p').remove(0);
  				$('#feedback').append("<p>You're cold.</p>");
  			} else if (Math.abs(guess - chosen) > 10) {
          $('#feedback p').remove(0);
  				$('#feedback').append("<p>You're warm..</p>");
  			} else if (Math.abs(guess - chosen) > 5) {
          $('#feedback p').remove(0);
  				$('#feedback').append("<p>You're HOT!</p>");
  			}
  		} else {
  			alert("You just wasted a guess! Please enter a number between 1 - 100");
  		}
  	};

    // Relative Feedback
    var relative = function() {
      var guess2 = parseInt($("#userGuess").val());
      var lastGuess;
      if (guess2 >= 1 && guess2 <= 100) {
        if (Math.abs(guess2 - chosen) < Math.abs(lastGuess - chosen)) {
          $('#feedback2 p').remove(0);
          $('#feedback2').append("<p>Closer than your last guess!</p>");
        } else if (Math.abs(guess2 - chosen) > Math.abs(lastGuess - chosen)) {
          $('#feedback2 p').remove(0);
          $('#feedback2').append("<p>You're getting further away!</p>");
        } else if (guess2 === lastGuess) {
          $('#feedback2 p').remove(0);
          $('#feedback2').append('<p>Really? That was your last guess.</p>');
        }
        var lastGuess = guess2;
      }
    };

    // Run processor on click
    $('#guessButton').on('click', function(e){
      e.preventDefault();
      processor();
      // relative();
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


