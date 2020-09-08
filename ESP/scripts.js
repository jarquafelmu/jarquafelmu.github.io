// randomly pick a card to be hidden
// user clicks on of the below card faces to guess
// game checks guess against actual
// if correct play happy sound and increase user score
// if incorrect vibrate device and play sad sound
// game ends when user reaches

const cards = [
    "square",
    "star",
    "circle",
    "plus",
    "waves"
];

const data = {
    sounds: {
        success: {
            id: '#roundWon',
            ref: null
        },
        fail: {
            id: '#roundLost',
            ref: null
        },
        won: {
            id: '#gameWon',
            ref: null
        },
        lost: {
            id: '#gameLost',
            ref: null
        }
    },
    hero: {
        id: '#hero',
        ref: null
    },
    gameExitScript: {
        win: {
            id: '#win',
            ref: null
        },
        lose: {
            id: '#lose',
            ref: null
        }
    },
    currentCard: null,
    score: {
        correct: 0,
        guess: 0,
        max: 10,
        threshold: 5,
        scoreboard: {
            id: '#scoreboard',
            ref: null
        },
        scoring: {
            id: '#score',
            ref: null
        }
    },
    gameRunning: true,
    showCardTime: 3000,
    gameOver: false
}

// cache reference
cache(data.sounds.success);
cache(data.sounds.fail);
cache(data.sounds.won);
cache(data.sounds.lost);
cache(data.score.scoreboard);
cache(data.score.scoring);
cache(data.gameExitScript.win);
cache(data.gameExitScript.lose);
cache(data.hero);

function cache(obj) {
    if (!obj) console.error("unable to cache object");
    obj.ref = document.querySelector(obj.id);
}

/**
 * Sets 'currentCard' to be a random card from the cards array
 */
function deal() {
    const num = Math.floor(Math.random() * cards.length);
    data.currentCard = cards[num];
}

/**
 * Checks the provided element's id against the chosen card
 * for this round
 * @param {*} element
 */
function gameLoop(element) {
    if (!data.currentCard || !element || !element.id) {
        if (!data.currentCard) console.warn('game not ready');
        if (!element || !element.id) console.error('element', element, 'is not valid');
        return;
    }
    const choice = element.id;
    console.info('House:', data.currentCard);
    console.info('Player:', choice);

    pauseGame();
    addClass(data.hero.ref, data.currentCard);
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('hide_card', {
            bubbles: true
        }));
    }, data.showCardTime);
    if (choice === data.currentCard) triggerSuccess();
    else triggerFail();
    incrementGuess();

    // check end condition
    if (data.score.correct >= data.score.threshold) {
        win();
    }// win
    else if (data.score.guess >= data.score.max) {
        lose();
    }// lose
}

/** Handles incrementing the score */
function incrementScore() {
    ++data.score.correct;
}

/**
 * Increments the guess counter
 */
function incrementGuess() {
    ++data.score.guess;
}

function win() {
    show(data.gameExitScript.win.ref);
    playSound(data.sounds.won.ref);
    endGame();
}

function lose() {
    show(data.gameExitScript.lose.ref);
    playSound(data.sounds.lost.ref);
    endGame();
}

function endGame() {
    data.gameOver = true;
    data.gameRunning = false;
}

function hideCards() {
    cards.forEach((face) => {
        removeClass(data.hero.ref, face);
    })
}

/**
 * Does actions related to a success
 */
function triggerSuccess() {
    console.info('success');
    playSound(data.sounds.success.ref);
    incrementScore();
    document.dispatchEvent(new CustomEvent('score_update', {
        bubbles: true
    }));
}

/**
 * Does actions related to a failure
 */
function triggerFail() {
    console.info('not correct :(');
    playSound(data.sounds.fail.ref);
    vibrate();

}

/**
 * Takes in a reference to an audio object and starts the audio
 * @param {*} ref
 */
function playSound(ref) {
    ref.play();
}

/**
 * Triggers the device to vibrate
 * @param {Array} pattern
 */
function vibrate(pattern = [100, 30, 200]) {
    if (!('vibrate' in window.navigator)) {
        console.error('Your browser does not support device vibration. :(');
        return;
    }
    if (window.navigator.vibrate(pattern))
        console.info('Vibrate worked!');
    else console.info('Vibration failed :(');
}

/**
 * Checks various aspects of the game to see if they are ready for
 * firing.
 *
 * Returns false if there is something that is not ready, else false;
 */
function gameReadyState() {
    if (isPlaying(data.sounds.success.ref) || isPlaying(data.sounds.fail.ref)) return false;
    if (!data.gameRunning) return false;
    return true;
}

/**
 * Checks if the audio source is actively playing sound
 * @param {*} src
 */
function isPlaying(src) {
    if (!src.paused || src.curretnTime) return true;
    return false;
}

/**
 * Sets the visibility of the target
 * @param {*} target
 * @param {*} isVisible
 */
function visible(target, isVisible) {
    if (!target) return;
    if (isVisible) show(target);
    else hide(target);
}

/**
 * Shows the element
 * @param {*} element
 */
function show(element) {
    removeClass(element, 'd-none');
}

/**
 * Hide the element
 * @param {*} element
 */
function hide(element) {
    addClass(element, 'd-none');
}

function addClass(element, className) {
    element.classList.add(className);
}

function removeClass(element, className) {
    element.classList.remove(className);
}

function setText(element, text) {
    element.innerHTML = text;
}

function pauseGame() {
    data.gameRunning = !data.gameRunning;
}

/**
 * Registers click events on the card buttons
 */
document.querySelectorAll('.btn.zener-card').forEach(element => {
    element.addEventListener('click', (event) => {
        if (!gameReadyState()) return;
        const id = event.target.id;
        event.target.dispatchEvent(new CustomEvent('game_start', {
            bubbles: true,
            detail: {
                target: event.target,
                text: event.target.innerHTML
            }
        }))
    });
});

/**
 * Registers the game to listen for the 'game_start' broadcast
 */
document.addEventListener('game_start', (e) => {
    deal();
    gameLoop(e.detail.target);
})

/**
 * Registers how to update the score that the user sees
 */
document.addEventListener('score_update', () => {
    data.score.scoring.ref.innerHTML = data.score.correct;
    visible(data.score.scoreboard.ref, !!data.score.correct);
});

document.addEventListener('hide_card', () => {
    hideCards();
    if (!data.gameOver) pauseGame();
});
