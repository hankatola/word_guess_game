$(document).ready(function() {

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
const lives = 12
var wins = 0, losses = 0, ratio = 1
var game = {
    word: [],                   // exploded word from wordBank goes here
    score: [],                  // len(score) = len(word), either 0 or 1 depending on whether or not the letter has been found
    tries: [],                  // tried letters
    remaining: lives,           // guesses remaining. g/o when remaining == 0
    display: '',                // display variable
    x: '',
}
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
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

// functions
function randInt() {
    // generates a random number in [0:49]
    let x = Math.ceil(Math.random() * wordBank.length) - 1;
    return x;
}

function prepareWord() {
    game.x = wordBank[randInt()]
    game.word = game.x.split('')
    game.tries = []
    game.score = []
    game.display = ''
    game.remaining = lives;
    for (let i in game.word) {
        game.score.push(0)
        game.display +=  '- '
    }
    game.display = game.display.substring(0,game.display.length - 1)
}

function sum() {
    // sums game.score to check for victory condition
    function add(x, y) {
        return x + y;
    }
    return game.score.reduce(add, 0);
}

function updateGame(key) {
    // record k, update remaining guesses & score if k in word
    if (game.tries.indexOf(key) < 0) {
        game.tries.push(key)
        game.tries.sort()
    } else {
        alert('You already tried \'' + key + '\'!')
        return
    }
    // create score array
    if (game.word.indexOf(key) >= 0) {
        for (let i in game.word) {
            if (key == game.word[i]) {
                game.score[i] = 1;
            }
        }
    } else {
        game.remaining -= 1
    }
    // create new display string
    game.display = ''
    for (let i in game.score) {
        if (game.score[i] == 1) {
            game.display += game.word[i] + ' '
        } else {
            game.display += '- '
        }
    }
    game.display = game.display.substring(0,game.display.length-1)
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

function keyPress(key) {
    // checks validity of keypress & gets valid letter
    let k = key.key.toLowerCase()
    if (alphabet.indexOf(k) < 0) {
        return;
    }
    main(k)
}

function display() {
    $('#display').text('Current Word:  ' + game.display)
    $('#remaining').text('Tries remaining: ' + game.remaining)
    $('#guesses').text(game.tries)
    $('#wins').text('Wins: ' + wins)
    $('#losses').text('Loss: ' + losses)
}

/*
    Main
    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/
function main(key) {
    let k, gs;
    if (game.word.length === 0) {
        prepareWord()
    }
    if (key != undefined) {
        updateGame(key)
    }

    display()
    gs = gameState()
    if (gs === 1) {                 // You won
        wins += 1
        display()                   // display last letter
        setTimeout(function(){
            alert('You won!')
        },50)
        prepareWord()
        setTimeout(function() {
            display()               // clear display after alert button
        },100)
    }
    if (gs === -1) {                // You lost
        let y = game.x
        losses += 1
        display()                   // display entered key & 0 remaining tries
        setTimeout(function(){
            alert('You lost! The word was ' + y)
        },50)
        prepareWord()
        setTimeout(function() {
            display()               // clears display & resets for new game after alert button pressed
        },100)
    }
}

// Call main to prepare memory
main()

// Call keypress on keypress, keypress calls main
$(document).keyup(keyPress)
$('#reset').on('click',function() {
    game.remaining=0
    main()
})

})