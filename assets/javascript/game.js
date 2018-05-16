//The central logic of the game is basically complete. Game knows 
//to increment wins, losses, etc. 

//Need to configure reset functions when win occurs or loss occurs.

var userWins = 0;
var userLosses = 0;
var gameCounter = 1;
var userGuesses = "";
var numOfGuesses = 7;
var wordInstance;
var placeholder = [];

var wordsBank = ["Han", "Luke", "Leial"];

function selectWord() {
    var randomNum = Math.floor(Math.random() * 3);
    return wordsBank[randomNum];
}

function displayBlanks() {
    var blanks = document.getElementById("word");
    for (var i = 0; i < wordInstance.length; i++) {
        placeholder.push("_");
    }
    blanks.innerHTML = placeholder.join(" ");
}

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

function displayGuess(letterGuessed, array) {
    var blanks = document.getElementById("word");
    var wordToBeGuessed = document.getElementById("word");
    for (var i = 0; i < array.length; i++) {
        console.log(placeholder[array[i]]);
        placeholder[array[i]] = letterGuessed;
    }
    blanks.innerHTML = placeholder.join(" ");
}

function checkIfWordGuessed () {
    console.log(placeholder.length);
    var wins = document.getElementById("wins");
    var losses = document.getElementById("losses");
    var counter = document.getElementById("counter");
    if (placeholder.join("") === wordInstance.toLowerCase() && placeholder.length === wordInstance.length) {
        userWins++;
        gameCounter++;
        wins.innerHTML = "User Wins: " + userWins;
        counter.innerHTML = "Game Counter: " + gameCounter;
        //NEED TO INCLUDE GAME RESET HERE
    }
}

function checkIfLost () {
    if (numOfGuesses === 0) {
        var losses = document.getElementById("losses");
        userLosses++;
        losses.innerHTML = "User Losses: " + userLosses;
    } 
}

function updateGuesses(letter) {
    userGuesses = userGuesses + letter + " " ;
    var guess = document.getElementById("userGuess");
    guess.innerHTML = userGuesses;
}

function myFunction() {

    wordInstance = selectWord();
    displayBlanks();
    console.log(wordInstance);

    document.addEventListener('keyup', function (event) {

        //storing user selected letter in variable keyName
        var keyName = event.key;

        //generating array hit which indictes whether or not keyName is in wordInstance
        var hit = isGuessInWord(keyName);

        //updating number of guesses left
        if (hit.length === 0) {
            numOfGuesses--;
            var num = document.getElementById("num");
            num.innerHTML = "Number of Guesses Left: " + numOfGuesses;
        } 

        //updating display of user guesses
        updateGuesses(keyName, );

        //updating guess hit
        displayGuess(keyName, hit);
        
        //user wins?
        checkIfWordGuessed();

        //user loses?
        checkIfLost();
    });
    
}


