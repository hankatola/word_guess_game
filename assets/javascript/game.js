/*  
    Word Guess Game
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

    TODO:
        victory & defeat
        test it
*/


// Memory objects
const lives = 12;
var game = {
    word: [], // exploded word from wordBank goes here
    score: [], // len(score) = len(word), either 0 or 1 depending on whether or not the letter has been found
    tries: [], // tried letters
    remaining: lives, // guesses remaining. g/o when remaining == 0
}



/*
    Main
    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾  
*/
function main(key) {

    // Private Variables
    let k, gs;
    let wordBank = [
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
    let alphabet = [
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

    // Private Functions
    function keyPress(key) {
        // checks validity of keypress & gets valid letter
        let k = parseInt(key.keyCode) - 65;
        if (k > 25 || k < 0) {
            return;
        }
        return alphabet[k];
    }

    function randInt() {
        // generates a random number in [0:49]
        let x = Math.ceil(Math.random() * wordBank.length) - 1;
        return x;
    }

    function reset() {
        // draws & prepares new word & resets game
        game.word = wordBank[randInt()].split('');
        game.tries = [];
        game.score = [];
        game.remaining = lives;
        for (let i in game.word) {
            game.score.push(0);
        }
    }

    function sum() {
        // sums game.score to check for victory condition    
        function add(x, y) {
            return x + y;
        }
        return game.word.reduce(add, 0);
    }

    function gameState() {
        // checks for victory or defeat
        let s = 0;
        if (game.word.length === sum()) {
            // victory
            s = 1;
        } else if (game.remaining === 0) {
            // defeat
            s = -1;
        }
        return s;
    }

    function updateGame() {
        // record k, update remaining guesses & score if k in word
        game.tries.push(k);
        game.remaining -= 1;
        if (game.word.indexOf(k) < 0) {
            for (let i in game.word) {
                if (k == game.word[i]) {
                    game.score[i] = 1;
                }
            }
        }
    }

    //  Body
    if (game.remaining === lives) { // if true a new game is required
        reset();
    }
    k = keyPress(key);
    if (game.tries.indexOf(k) !== -1) { // duplicate keypress -> exit main
        return;
    }
    updateGame();
    gs = gameState();
    if (gs === 0) { // game not won or lost -> exit main
        return
    } else if (gs < 0) { // defeat
        // sadness
    } else { // victory
        // celebration
    }
    game.remaining = lives; // game's over & this causes reset on next go-around
}

// Call main on keypress
window.addEventListener('keyup', main, false);