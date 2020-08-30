var datastore = {
    button_states: {
        start: 'Begin',
        during: 'Listening',
        error: 'Error'
    },
    cards: [{
        name: "star",
        face: '🂱'
    },
    {
        name: "square",
        face: '🂲'
    },
    {
        name: "circle",
        face: '🂳'
    },
    {
        name: "waves",
        face: '🂴'
    },
    {
        name: "plus",
        face: '🂵'
    }],
    mic_img: '🎤',
    deck: [],
    decksize: 25,  
    error: {
        speech: 'no-speech',
        mic: 'audio-capture',
        blocked: 'not-allowed'
    },
    numcopies: 5,
    recognizing: false,
    score: {
        current: 0,
        total: 25,
        threshold: 11
    },
    voicelines: {
        opening: "I'm going to test you for extra sensory power. The other side of this card is a circle, plus, waves, square, or star. Clear your mind. When you're ready, if you are ever ready, say the name out loud. You may also say 'cancel' if you are scared.",
        // correct: "You got that correct but you're still just a mortal.",
        correct: "correct",
        incorrect: "You were wrong, better luck next time, non-ESP-gifted-mortal.",
        notvalid: "invalid",
        notunderstood: "I didn't get that, try again",
        exit: "Goodbye.",
        quit: "It's okay, you are just a mortal. Refresh and come back when you are braver.",
        next: "Next",
        console: "That's alright mortal, we can't all be gifted."
    }
}

const sleep = (delay) => new Promise((reslove) => setTimeout(resolve, delay));

var recognition = null;
{ // voice recognition setup
    var diagnostic = $("#diagnostic");

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

    recognition = new SpeechRecognition();
    var grammar = '#JSFG V1.0; grammar cards; public <card> = star | circle | square | waves | plus | cancel ;'
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);

    recognition.grammar = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    var recognizing = false;

    recognition.addEventListener('start', function () {
        datastore.recognizing = true;
        console.info('started listening');
        // setSpeechButtonText(datastore.button_states.during);
        $("#overlay-listen").show();
    });

    recognition.addEventListener('result', function () {
        var result = event.results[0][0];
        let word = result.transcript.toLowerCase();
        console.info(`Result received ${word}`);

        if (word === 'cancel') {
            quit();
            return;
        }

        processInput(word);
    });

    recognition.addEventListener('end', function () {
        datastore.recognizing = false;
        console.info('stopped listening');
        // setSpeechButtonText(datastore.button_states.start);
        $("#overlay-listen").hide();        
        gameLoop();
    });

    recognition.onspeechend = function () {
        console.info("Speech has stopped being detected");
    }

    recognition.onnomatch = function () {
        diagnostic.text("I didn't recognize that word");
        console.info("Speech not recognized");
    }

    recognition.onerror = function (event) {
        console.error(`error: ${event.error}`);
    }
}

window.addEventListener('beforeunload', function() {
    recognition.abort();
});

async function processInput(word) {
    const card = getCard(word);
    if (card === undefined) {
        console.info("not a valid card");
        await speak(datastore.voicelines.notvalid);
        recognition.start();
    } else {
        console.info("valid card");

        // speak(datastore.voicelines.correct);
        // hideCards(true);
        // $(`#${card.name}`).show();     
        gradeChoice(card);
    }
}

async function gradeChoice(choice) {
    if (currentCard.face === choice.face)
        correctAnswer();
    else
        incorrectAnswer();
}

async function correctAnswer() {
    await speak(datastore.voicelines.correct);
    increaseScore();
    sleep(1000);
}

async function incorrectAnswer() {
    await speak(datastore.voicelines.incorrect);
    sleep(1000);
}

async function getCard(input) {
    return datastore.cards.find(element => element.name === input);
}

async function speak(msg) {
    if (!('speechSynthesis' in window)) {
        alert("Your browser does not support speech synthesis.");
        return false;
    } else {
        var u = new SpeechSynthesisUtterance(msg);
        // u.text = msg;
        speechSynthesis.speak(u);
        await sleep(1000);
        return true;
    }
}

async function hideCards(all = false) {
    let target = ".card"
    if (!all)
        target = `${target}.face`
    $(target).hide();
}


async function begin() {
    await speak(datastore.voicelines.opening);
}

async function correct() {
}

async function incorrect() {
}

async function buildDeck() {
    datastore.cards.forEach((card) => {
        for (let i = 0; i < datastore.numcopies; ++i) {
            datastore.deck.push(card.face);
        }
    });

    datastore.deck.sort((a, b) => {
        // by giving a random number, the cards will be sorted in a
        // random order
        return Math.random() - 0.5;
    });
}

async function deal() {
    return translate(datastore.deck.pop());
    // return datastore.cards.find(element => element.name === 'star');
}

async function translate(deckcard) {
    return datastore.cards.find(element => element.face === deckcard);
}

hideCards();
$("#overlay-begin").show();

$('#speak').click(() => {
    if (datastore.recognizing) return;
    recognition.start();
    setSpeechButtonText(datastore.button_states.during);
    console.log('Ready to receive a color command');
});

$("#overlay-listen").click(() => {
    $(this).hide();
    recognition.stop();
});

$("#overlay-begin").click(() => {
    // console.log(this);
    // $(this).hide();
    $("#overlay-begin").hide();
    game();
});

let currentCard = null;
// game
async function game() {
    // begin
    await speak(datastore.voicelines.opening);
    

    buildDeck();
    gameLoop();
    
    // pick a card
    // introduce the user
    // user guesses
    // give feedback
    // if correct mark and next
    // if incorrect 'console' and next
    // loop 25 times
}

async function endGame(won) {
    if (won) {}
}

async function quit() {
    await speak(datastore.voicelines.quit);
}

async function gameLoop() {   
    displayScore(); 
    currentCard = deal();
    recognition.start();
}

async function displayScore() {
    $("#correct").html(datastore.score.current);
    $("#total").html(datastore.score.total);
}

async function increaseScore() {
    datastore.score.current += 1;
}

async function checkGameOver() {
    if (datastore.score.current >= datastore.score.threshold) {
        // game won
        endGame(true);
    }
    else if (datastore.deck.length == 0) {
        // game is over, player lost
        endGame(false);
    }
    // go again
    await speak(datastore.voicelines.next);
    gameLoop()
}
