$(document).ready(function() {
	// Initialize global variables
	var qsAraray, correct, incorrect, unanswered, currentIndex, timeIsUp;

	// create array for timer which dictates the forms
	var questionTimer = {
		time: 30,

		reset: function () {
        	questionTimer.time = 30;
    	},
   		start: function(){
   			$('#time').html("Time Remaining: " + questionTimer.time).css("color", "#BCFEFF");;
        	counter = setInterval(questionTimer.count, 1000);
    	},
    	stop: function(){
        	clearInterval(counter);
    	},
    	count: function(){
   	        questionTimer.time--;
	        $('#time').html("Time Remaining: " + questionTimer.time);
    	},
	}

	//Initializes the question array and dictates how on(click) functions
	function varSet() {
		qsArray = [{
            // place holder arrays
			question: "What is a Pickle?",
			answers: ["Deviljho","Odogoron", "Yama Tsukami","Plesioth"],
			piccorrect: 'assets/images/deviljho.gif',
			picincorrect: 'assets/images/fail.jpg',
			correctanswer: 0
        },
        {
            // place holder arrays
			question: "What monster is refered to as Sick Flips Doggo?",
			answers: ["Odogoron", "Great Jaggras", "Rathalos", "Zinogre"],
			piccorrect: 'assets/images/zinogre.gif',
			picincorrect: 'assets/images/fail.jpg',
			correctanswer: 3
        },
        {
            // place holder arrays
			question: "What is the desire sensor?",
			answers: ["Kushala's ultimate move","The bane of my existance", "Nergigante's special move", "Teostra's special move"],
			piccorrect: 'assets/images/gemcarve.gif',
			picincorrect: 'assets/images/fail.jpg',
			correctanswer: 1
        },
        {
            // place holder arrays
			question: "What is a nickname for Kirin?",
			answers: ["MLP", "Thunder Unicorn Attack Force","Kelbidrome", "Annoying"],
			piccorrect: 'assets/images/kirin.gif',
			picincorrect: 'assets/images/fail.jpg',
			correctanswer: 2
        },
        {
            // place holder arrays
			question: "What monster goes Super Saiyan?",
			answers: ["Legiana","Nargacuga", "Rajang", "Tigrex"],
			piccorrect: 'assets/images/rajang.gif',
			picincorrect: 'assets/images/fail.jpg',
			correctanswer: 2
        },
        {
            // place holder arrays
			question: "Which monster self identifies as a B-52 Bomber",
			answers: ["Bazelgeuse", "Alteron","Diablos","Anjanath"],
			piccorrect: 'assets/images/b52.gif',
			picincorrect: 'assets/images/fail.jpg',
			correctanswer: 0
        },
        {
            // place holder arrays
			question: "Which monster is also known as Flesh Puppers",
			answers: ["Odogoron", "Zinogre", "Great Jirros", "Khezu"],
			piccorrect: 'assets/images/odogoron.gif',
			picincorrect: 'assets/images/fail.jpg',
			correctanswer: 0
        },
    ]

		correct = 0;
		incorrect = 0;
		unanswered = 0;

        // Count will increment to 0 immediately
		currentIndex = -1;	

		$('#question').html("<button class='btn' id='start'>Start</button>")
		$('#btn0, #btn1, #btn2, #btn3').hide().off('click');

		$('#start').on("click", function() {
			advance();
		});
	}

	// displays the question form for the specific question
	function askQuestions() {
		questionTimer.start();
		$('#question').html(qsArray[currentIndex].question);
		$('#btn0').show().html(qsArray[currentIndex].answers[0]);
		$('#btn1').show().html(qsArray[currentIndex].answers[1]);
		$('#btn2').show().html(qsArray[currentIndex].answers[2]);
		$('#btn3').show().html(qsArray[currentIndex].answers[3]);
		$('#gifHolder').hide().off('click');

		onClickAnswer();
	}

	// Logic for when the user clicks a btn compares btn value to the correct answer
	function onClickAnswer() {
		$('.btn').on("click", function() {
			var buttonClick = parseInt($(this).attr('value'));
			if(buttonClick === qsArray[currentIndex].correctanswer) {
				correctAnswer();
			}
			else {
				incorrectAnswer();
			}
		});
	}

	// function for when the user selects the correct answer
	function correctAnswer() {
		clearTimeout(timeIsUp);
		correct++;
		questionTimer.stop();
		questionTimer.reset();
		$('#time').empty();
		$('#question').html("<h2>Correct!</h2>");
		$('#btn0, #btn1, #btn2, #btn3').hide().off('click');
		$('#gifHolder').show().html("<img class='gifs' src=" + qsArray[currentIndex].piccorrect + ">");

		timeIsUp = setTimeout(advance, 4 * 1000);
	}

	// function for the user selecting the incorrect answer
	function incorrectAnswer() {
		clearTimeout(timeIsUp);
		incorrect++;
		questionTimer.stop();
		questionTimer.reset();
		$('#time').empty();
		$('#question').html("<h2>Invading Monster!</h2>");
		$('#btn0, #btn1, #btn2, #btn3').hide().off('click');
		$('#gifHolder').show().html("The correct answer was: " + qsArray[currentIndex].answers[qsArray[currentIndex].correctanswer] +
			"<br><img class='gifs' src=" + qsArray[currentIndex].picincorrect + ">");

		timeIsUp = setTimeout(advance, 4 * 1000);
	}

	// Logic for when the questionTimer reaches 0, ends game by stoping timer
	function timesUp() {
		clearTimeout(timeIsUp);
		unanswered++;
		questionTimer.stop();
		questionTimer.reset();
		$('#time').empty();
		$('#question').html("<h2>Time's Up!</h2>");
		$('#btn0, #btn1, #btn2, #btn3').hide().off('click');
		$('#gifHolder').show().html("The correct answer was: " + qsArray[currentIndex].answers[qsArray[currentIndex].correctanswer] +
			"<br><img class='gifs' src=" + qsArray[currentIndex].picincorrect + ">");

		timeIsUp = setTimeout(advance, 4 * 1000);
	}

	// Display for when the user completes the trivia game
	function endScreen() {
		$('#time').html("<h2>Good job!</h2>");
		$('#question').html("Your results <br><br>Correct: " + correct + "<br>Incorrect: " + incorrect + "<br>Not Answered: " + unanswered);

		$('#gifHolder').html("<button class='btn' id='playagain'>Play again?</button>")

		$('#playagain').on("click", function() {
			varSet();
			advance();
		});
	}

	// Itterates through the question array and gives user 30s to answer the question
	function advance() {
		currentIndex++;

		if(currentIndex < qsArray.length) {
			askQuestions();
			timeIsUp = setTimeout(timesUp, 30 * 1000);
		} else {
			endScreen();
		}
	}

	// starts the game function
	varSet();

});