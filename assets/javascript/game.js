$(document).ready(function() {

alert("Press any letter key to make your guess!");

 // Key word array 
 var keyWord = [
     "muggle",
     "wizard",
     "wand",
     "magic",
     "potions",
     "horcrux",
     "snitch",
     "patronus",
     "quaffle",
     "seeker",
     "auror",
     "beater",
     "witch",
     "mudblood",
     "deatheater",
     "gryffindor",
     "hufflepuff",
     "ravenclaw",
     "slytherin",
     "hogwarts",
     "charm",
     "goblet",
     "quidditch",

 ];

 const guessLimit = 10;
 var pauseGame = false;
 var lettersGuessed = [];
 var wordGuess = [];
 var currentWord;
 var numberOfGuesses;
 var wins = 0;

 resetGame();
 
// Game starts when key is pressed
document.onkeypress = function(event) {
    // Make sure key pressed is an alpha key (*use to avoid making an alpha array)
    if (isAlpha(event.key) && !pauseGame) {
        checkForLetter(event.key.toLowerCase())
    }; // if statement end
}; // document.onkeypress end

// Check to see if the letter the user guessed is in the current key word 
function checkForLetter(letter) {
    var foundLetter = false;
    var winSound = document.createElement("audio");
    var lossSound = document.createElement("audio");
    // Set sound source for correct guess
    winSound.setAttribute("src", "assets/sounds/Expecto_Patronum_Sound_Effect.mp3");
    // Set sound source for incorrect guess
    lossSound.setAttribute("src","assets/sounds/Avada_Kedavra_Sound_Effect.mp3");

    for (var i=0, j= currentWord.length; i<j; i++) {
        if (letter === currentWord[i]) {
            wordGuess[i] = letter;
            foundLetter = true;
        
            // If word guess matches current word
            if (wordGuess.join("") === currentWord) {
               // Play win sound
               winSound.play()
                // Update number of wins
                wins++;
                pauseGame = true;
                updateDisplay();
                setTimeout(resetGame,1000);
            }; // 2nd if statement end
        }; // 1st if statement end
    }; // for loop end

    if (!foundLetter) {
        
        // Check to see if inccorrect leter has already been guessed
        if (!lettersGuessed.includes(letter)) {
            // Add incorrect letter to already guesses list if it is not there akready
            lettersGuessed.push(letter)
            // Update the number of guesses left
            numberOfGuesses--
        }
        if (numberOfGuesses === 0) {
            // Play loss sound
            lossSound.play()
            // Display answer before reseting the game
            wordGuess = currentWord.split();
            pauseGame = true;
            setTimeout(resetGame, 1000);
        }; // 3rd if statement end
        }; // 2nd if statement end

    // Update the display
    updateDisplay()

    }; // 1st if statement end

// Check if the  key pressed is within a-z
function isAlpha (ch){
    return /^[a-z]$/i.test(ch);
}; // End of function

function resetGame() {
    numberOfGuesses = guessLimit
    pauseGame = false

    // Get a new key word
    currentWord = keyWord[Math.floor(Math.random() * keyWord.length)].toLowerCase();
    console.log(currentWord);

    // Reset word arrays
    lettersGuessed = []
    wordGuess = []

    // Set underscores in place of currentWord
    for (var i=0, j=currentWord.length; i < j; i++){
        if (currentWord[i] === " ") {
            wordGuess.push(" ")
        } else {
            wordGuess.push(" __ ")
        }
    }; // end of for loop

    // Update the display
    updateDisplay()
;} // End of function

// Function to update the display
function updateDisplay () {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = wordGuess.join("");
    document.getElementById("remainingGuesses").innerText = numberOfGuesses;
    document.getElementById("guessedLetters").innerText =  lettersGuessed.join(" ");
}; // End of function

}) // End of document.ready function