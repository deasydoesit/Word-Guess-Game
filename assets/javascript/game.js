//Globl variables used throughout
var userWins = 0;
var userLosses = 0;
var gameCounter = 1;
var userGuesses = "";
var numOfGuesses = 7;
var wordInstance;
var placeholder = [];
var start = false;

var wordsBank = ["Han", "Luke", "Leia", "Chewie", "Hoth", "Ewok", "Tatooine"];

//Function to restart the game.
function restart() {
    var num = document.getElementById("num");
    var userGuess = document.getElementById("userGuess");
    var word = document.getElementById("word");
    numOfGuesses = 7;
    userGuesses = "";
    wordInstance = undefined;
    placeholder = [];
    num.innerHTML = "Number of Guesses Left: " + numOfGuesses;
    userGuess.innerHTML = "User Guesses";
    word.innerHTML = "This is the word";
}

//Function to make game counter elements (e.g., wins, losses, game counter, etc)
//appear on the click of R2D2.
function appear() {
    var firstDiv = document.getElementById("display");
    var secondDiv = document.getElementById("playAgain")
    firstDiv.style.display = null;
    secondDiv.style.display = null;
}

//Function to make user guesses and blanks/correct letters blank after game completion.
function hide() {
    var element = document.getElementById("playAgain");
    element.style.display = "none";
}

//Function to assign a word from wordsBank to the wordInstance. Creates random number
//then pulls the array value from the index corresponding to the random number.
function selectWord() {
    var randomNum = Math.floor(Math.random() * 3);
    return wordsBank[randomNum];
}

//Function to display blanks corresponding to the length of the wordInstance. Again, 
//wordInstance holds the randomly selected word from the wordBanks array.
function displayBlanks() {
    var blanks = document.getElementById("word");
    for (var i = 0; i < wordInstance.length; i++) {
        placeholder.push("_");
    }
    blanks.innerHTML = placeholder.join(" ");
}

//Function to identify whether a user guessed letter is in the wordInstance. In order
//to account for words with repeat letters (e.g., banana), I'm creating an arrayOfHits 
//which will hold the index corresponding to each matched letter corresponding to the 
//user guessed letter. 
function isGuessInWord(guess) {
    var arrayOfHits = [];
    var lowerCaseWordInstance = wordInstance.toLowerCase();
    for (var i = 0; i < lowerCaseWordInstance.length; i++) {
        if (lowerCaseWordInstance[i] === guess) {
            arrayOfHits.push(i);
        }
    }
    return arrayOfHits;
}

//Function to display correctly guessed letter, if any. The guessed letter is passed as
//an argument into letterGuessed, and the return value from isGuessInWord is passed 
//into array. 
function displayGuess(letterGuessed, array) {
    var correctLetter = document.getElementById("word");
    for (var i = 0; i < array.length; i++) {
        placeholder[array[i]] = letterGuessed;
    }
    correctLetter.innerHTML = placeholder.join(" ");
}

//Function to identify if the user guessed the word. If so, update wins and game counter.
function checkIfWordGuessed() {
    var enableR2D2 = document.getElementById("startGame");
    var wins = document.getElementById("wins");
    var counter = document.getElementById("counter");
    if (placeholder.join("") === wordInstance.toLowerCase() && placeholder.length === wordInstance.length) {
        userWins++;
        gameCounter++;
        wins.innerHTML = "User Wins: " + userWins;
        counter.innerHTML = "Game Counter: " + gameCounter;
        restart();
        hide();
        enableR2D2.setAttribute("onclick", "startGame()");
        enableR2D2.style.cursor = "pointer";
    }
}

//Function to identify if the user is out of guesses.
function checkIfLost() {
    if (numOfGuesses === 0) {
        var enableR2D2 = document.getElementById("startGame");
        var losses = document.getElementById("losses");
        userLosses++;
        losses.innerHTML = "User Losses: " + userLosses;
        restart();
        hide();
        enableR2D2.setAttribute("onclick", "startGame()");
        enableR2D2.style.cursor = "pointer";
    } 
}

//Function to update the user's guessed letters.
function updateGuesses(letter) {
    userGuesses = userGuesses + letter + " " ;
    var guess = document.getElementById("userGuess");
    guess.innerHTML = userGuesses;
}

//Function to update the number of guesses left
function updateGuessesRemaining(array) {
    if (array.length === 0) {
        numOfGuesses--;
        var num = document.getElementById("num");
        num.innerHTML = "Number of Guesses Left: " + numOfGuesses;
    } 
}

//Function to toggle starter boolean to true based on button click.
function startGame() {

    //Disable button from being pressed repeatedly and breaking the game
    var disableR2D2 = document.getElementById("startGame");
    disableR2D2.setAttribute("onclick", "#");
    disableR2D2.style.cursor = "default";
    //wordInstance for the game is selected
    wordInstance = selectWord();

    //Blanks are displayed corresponded to the length of the wordInstance
    displayBlanks();

    appear();
    console.log(wordInstance);

    //Listening for user selection
    document.onkeyup = function(event) {
        //Storing user selected letter in variable keyName
        var keyName = event.key;

        //Generating array hit which indictes whether or not keyName is in wordInstance
        var hit = isGuessInWord(keyName);

        //Updating number of guesses left
        updateGuessesRemaining(hit);

        //Updating display of user guesses
        updateGuesses(keyName);

        //Updating guess hit
        displayGuess(keyName, hit);
        
        //User wins?
        checkIfWordGuessed();

        //User loses?
        checkIfLost();
    }
}



