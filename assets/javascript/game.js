//The central logic of the game is basically complete. Game knows 
//to increment wins, losses, etc. 

//Need to configure reset functions when win occurs or loss occurs.

//Globl variables used throughout
var userWins = 0;
var userLosses = 0;
var gameCounter = 1;
var userGuesses = "";
var numOfGuesses = 7;
var wordInstance;
var placeholder = [];

var wordsBank = ["Han", "Luke", "Leial"];

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
        console.log("placeholder[array[i]] = " + placeholder[array[i]]);
        placeholder[array[i]] = letterGuessed;
        console.log("placeholder = " + placeholder);
    }
    correctLetter.innerHTML = placeholder.join(" ");
}

//Function to identify if the user guessed the word. If so, update wins and game counter.
function checkIfWordGuessed () {
    var wins = document.getElementById("wins");
    var counter = document.getElementById("counter");
    if (placeholder.join("") === wordInstance.toLowerCase() && placeholder.length === wordInstance.length) {
        userWins++;
        gameCounter++;
        wins.innerHTML = "User Wins: " + userWins;
        counter.innerHTML = "Game Counter: " + gameCounter;
        //NEED TO INCLUDE GAME RESET HERE
    }
}

//Function to identify if the user is out of guesses.
function checkIfLost () {
    if (numOfGuesses === 0) {
        var losses = document.getElementById("losses");
        userLosses++;
        losses.innerHTML = "User Losses: " + userLosses;
    } 
}

//Function to update the user's guessed letters.
function updateGuesses(letter) {
    userGuesses = userGuesses + letter + " " ;
    var guess = document.getElementById("userGuess");
    guess.innerHTML = userGuesses;
}

//Function to start the game, which links up to the html input element.
function startGame() {

    //wordInstance for the game is selected
    wordInstance = selectWord();

    //Blanks are displayed corresponded to the length of the wordInstance
    displayBlanks();

    console.log(wordInstance);

    //Listening for user selection
    document.addEventListener('keyup', function (event) {

        //Storing user selected letter in variable keyName
        var keyName = event.key;

        //Generating array hit which indictes whether or not keyName is in wordInstance
        var hit = isGuessInWord(keyName);

        //Updating number of guesses left
        if (hit.length === 0) {
            numOfGuesses--;
            var num = document.getElementById("num");
            num.innerHTML = "Number of Guesses Left: " + numOfGuesses;
        } 

        //Updating display of user guesses
        updateGuesses(keyName, );

        //Updating guess hit
        displayGuess(keyName, hit);
        
        //User wins?
        checkIfWordGuessed();

        //User loses?
        checkIfLost();
    });
    
}


