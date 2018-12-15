/*  Word Guess Game
    Author: Dave Paquette
    Date: Dec. 2018

    Program Description:
        (1) Program picks a word
        (2) Program displays # of letters in word ala hangman
        (3) key strike is captured & pushed into guess array
        (4) Letter is searched for in target word
            if (found) all such letters are displayed in target on screen
            if (!found) tries/lives remaining =- 1
        (5) Program ends when (lives === 0) | (all letters are displayed in target word)
        (6) keystroke to restart

    Operation Plan:

*/


// Listen for keypress
window.addEventListener('keyup', keyPress, false);



/////////////////////////////////////////////////////////////////////////
// Memory objects
/////////////////////////////////////////////////////////////////////////

const lives = 12;

var wordBank = [
    'worthless',
    'decorate',
    'want',
    'copy',
    'trouble',
    'clean',
    'plastic',
    'premium',
    'measure',
    'drop',
    'practise',
    'brush',
    'spoon',
    'crack',
    'mere',
    'shape',
    'bridge',
    'used',
    'troubled',
    'fixed',
    'statement',
    'wrathful',
    'yielding',
    'sound',
    'acoustics',
    'transport',
    'aggressive',
    'lovely',
    'deer',
    'oil',
    'marble',
    'smoke',
    'travel',
    'change',
    'pancake',
    'belong',
    'hellish',
    'letter',
    'eyes',
    'shame',
    'futuristic',
    'grieving',
    'extend',
    'spiky',
    'automatic',
    'unsuitable',
    'bawdy',
    'suck',
    'elastic',
    'tease'
]

var alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
]

var game = {
    word: [], // exploded word from wordBank goes here
    score: [], // len(score) = len(word), either 0 or 1 depending on whether or not the letter has been found
    tries: [], // tried letters
    remaining: lives, // guesses remaining. g/o when remaining == 0
}



/////////////////////////////////////////////////////////////////////////
// subordinate functions
/////////////////////////////////////////////////////////////////////////

function randInt() {
    // generates a random number in [0:49]
    let x = Math.ceil(Math.random() * wordBank.length) - 1;
    return x;
}

function sum() {
    // sums game.score to check for victory condition
    function add(x, y) {
        return x + y;
    }
    return game.word.reduce(add, 0);
}

function reset() {
    // Only called from main(), selects random word from list & initializes game to start
    // Only place where a new word is drawn.
    game.word = wordBank[randInt()].split('');
    game.tries = [];
    game.score = [];
    game.remaining = lives;
    // populate score dict keys w/ value pairs of 0
    for (let i in game.word) {
        game.score.push(0);
    }
}

function keyPress(key) {
    // check for valid keypress - only letters [a:z] are valid. If valid, call main w/ the letter pressed
    let k = parseInt(key.keyCode) - 65;
    if (k > 25 || k < 0) {
        return;
    } else {
        main(alphabet[k]);
    }
}

function checkGuess(k) {
    // If k has been tried before then exit/ignore this keystroke
    if (game.tries.indexOf(k) !== -1) {
        return;
    }
    // record guessed letter (k) & update remaining guesses
    game.tries.push(k);
    game.remaining -= 1;
    // if k in word, update score array
    if (game.word.indexOf(k) < 0) {
        for (let i in game.word) {
            if (k == game.word[i]) {
                game.score[i] = 1;
            }
        }
    }

}

function gameState() {
    let s;
    if (game.word.length === sum()) {
        // victory
        s = 2;
    } else if (game.remaining === 0) {
        // defeat
        s = 1;
    } else {
        // continue
        s = 0;
    }
    return s;
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////  MAIN  //////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////

function main(k) {
    // if 1st time around then call reset to pick a word & prepare memory
    if (game.remaining === lives) {
        reset();
    }
    // legit keystroke - proceed w/ game
    checkGuess(k);
    // check for victory condition
    let state = gameState();
    if (state === 0) {
        // continue
        return
    } else if (state === 1) {
        // defeat
        // sadness
    } else {
        // victory
        // celebration
    }
    reset();
}


// initialize the program